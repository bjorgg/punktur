import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    if (!req.user){
        return res.json({ user: null });
    }
    const {password, ...user} = req.user;
    return res.json({ user });
});

export default handler;