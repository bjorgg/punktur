import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import { getStoriesByUser } from "../../db/stories";

const handler = nextConnect();

handler.use(middleware);

// getting user
handler.get(async (req, res) => {
    // checking if user is logged in
    if (!req.user){
        return res.json({ user: null });
    } 

    const userStories = await getStoriesByUser(req.db, req.user._id, 20);
    return res.json({ userStories });
});

export default handler;
