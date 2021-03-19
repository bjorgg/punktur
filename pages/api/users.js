import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import middleware from "../../middleware/middleware";
import { insertUser, findUserByEmail, /*findUserByName*/ } from "../../db/user";


const handler = nextConnect();

handler.use(middleware);


// handler validating email, password, username
// if user is authenticated we return an object to the state
handler.post(async (req, res) => {
    const { username, password } = req.body;
    const email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
        res.status(400).send("Netfangið er ógilt");
        return;
    }
    if (!password || !username) {
        res.status(400).send("Það þarf að fylla út alla reyti");
        return;
    }
    if (await findUserByEmail(req.db, email)) {
        res.status(403).send("Netfangið er nú þegar í notkun");
        return;
    }
    if (await findUserByName(req.db, username)) {
        res.status(403).send("Notendanafnið er nú þegar í notkun");
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser(req.db, {
        email,
        password: hashedPassword,
        username,
    });
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
