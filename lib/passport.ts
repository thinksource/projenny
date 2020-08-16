import passport from 'passport'

import LocalStrategy from 'passport-local'
import { pwhash, dbManager } from '../db';
import { User } from '../db/entity/User';

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.username)
})

passport.deserializeUser(function (req, id, done) {
  // deserialize the username back into user object
  const user = dbManager.findOne(User, {email: id})
  done(null, user)
})

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = await dbManager.findOne(User, {email: username})
      // Security-wise, if you hashed the password earlier, you must verify it
      // if (!user || await argon2.verify(user.password, password))
      const pw = pwhash(password, user.salt);
      if (!user || user.password !== pw) {
        done(null, null)
      } else {
        done(null, user)
      }
    }
  )
)

export default passport