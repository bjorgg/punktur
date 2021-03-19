import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import passport from '../../middleware/passport';

const handler = nextConnect();

handler.use(middleware);

// calling passport to sigin in the user based on their email and password
handler.post(passport.authenticate('local'), (req, res) => {
  // returning our user object without the password
  const {password, ...user} = req.user;
  res.json({ user });
});

// delete request for logout
handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
