import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import passport from '../../middleware/passport';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => {
    const {password, ...user} = req.user;
  res.json({ user });
});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
