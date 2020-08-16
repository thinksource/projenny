import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import auth from '../../../middleware/auth'
import passport from '../../../lib/passport'

const handler = nextConnect()

handler.use(auth).post(passport.authenticate('local'), (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ 
    name: req.query['user'],
    request: req.query
    })
})

export default handler
   