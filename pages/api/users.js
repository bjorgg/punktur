import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middleware/middleware";
import { insertUser, findUserByEmail, findUserByName } from "../../db/user";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    const { username, password } = req.body;
    const email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
        res.status(400).send("The email you entered is invalid.");
        return;
    }
    if (!password || !username) {
        res.status(400).send("Missing field(s)");
        return;
    }
    if (await findUserByEmail(req.db, email)) {
        console.log('halloooo')
        res.status(403).send("The email has already been used.");
        return;
    }
    // if (await findUserByName(req.db, username)) {
    //     res.status(403).send("The username has already been used.");
    //     return;
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser(req.db, {
        email,
        password: hashedPassword,
        username,
    });
    console.log(user);
    req.logIn(user, (err) => {
        if (err) {
            throw err;
        }
        const { password, ...user } = req.user;
        res.status(201).json({
            user,
        });
    });
});

export default handler;
