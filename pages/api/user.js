import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import { updateUserById, findUserByEmail, findUserByName, deleteUserById } from "../../db/user";


const handler = nextConnect();

handler.use(middleware);

// getting user
handler.get(async (req, res) => {
    // checking if user is logged in
    if (!req.user){
        return res.json({ user: null });
    }
    const {password, ...user} = req.user;
    return res.json({ user });
});

const isLoggedInUser = (user, req) => {
    return user._id.toString() === req.user._id.toString();
}

// patch update user
handler.patch(async (req, res) => {
    // checking if user is logged in
    if (!req.user) {
      req.status(401).end();
      return;
    }
    const update = JSON.parse(req.body);

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
    await updateUserById(req.db, req.user._id, update)

    res.json({ user: update });
  });

  // delete user
  handler.delete(async (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
      }
      const deleteResult = await deleteUserById(req.db, req.user._id)
      res.json({deleted: !!deleteResult.ok})
  })

export default handler;