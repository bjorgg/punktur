import nextConnect from "next-connect";
import middleware from "../../middleware/middleware";
import { updateUserById, findUserByEmail, findUserByName, deleteUserById } from "../../db/user";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({ dest: "/tmp" });

const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

const handler = nextConnect();

handler.use(middleware);

// getting user
handler.get(async (req, res) => {
    // checking if user is logged in
    if (!req.user) {
        return res.json({ user: null });
    }
    const { password, ...user } = req.user;
    return res.json({ user });
});

const isLoggedInUser = (user, req) => {
    return user._id.toString() === req.user._id.toString();
};

// patch update user
handler.patch(upload.single('avatar'), async (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }
    let avatar;
    if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
            width: 200,
            height: 200,
            crop: "fill",
        });
        avatar = image.secure_url;
        
    }
    const update = req.body;

    const userByEmail = await findUserByEmail(req.db, update.email);
    if (userByEmail && !isLoggedInUser(userByEmail, req)) {
        res.status(403).send("Netfangið er nú þegar í notkun");
        return;
    }
    const userByName = await findUserByName(req.db, update.username);
    if (userByName && !isLoggedInUser(userByName, req)) {
        res.status(403).send("Notendanafnið er nú þegar í notkun");
        return;
    }
    await updateUserById(req.db, req.user._id, {...update, avatar});

    res.json({ user: update });
});

// delete user
handler.delete(async (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }
    const deleteResult = await deleteUserById(req.db, req.user._id);
    res.json({ deleted: !!deleteResult.ok });
});

// multer handles parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
