import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserById, findUserByEmail } from '../db/user';

// when authentication this is used to find the user again
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// use stored id to fetch user
passport.deserializeUser((req, id, done) => {
  findUserById(req.db, id).then((user) => done(null, user), (err) => done(err));
});
// check if user is valid
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await findUserByEmail(req.db, email);
      if (user && (await bcrypt.compare(password, user.password))){
        done(null, user);
      } else {
        done(null, false, { message: 'Netfang eða lykilorð stemma ekki' });
      } 
    },
  ),
);

export default passport;
