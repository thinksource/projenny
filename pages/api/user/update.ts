import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'
import { createUser, UserData, deletUser } from '../../../lib/user'

import { NextApiRequest, NextApiResponse } from 'next'

import { serialize } from 'cookie'

const handler = nextConnect()

handler
  .use(auth)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    // const { name, username, favoriteColor } = req.user
    // res.json({ user: { name, username, favoriteColor } })
    res.json({ user: req.query['user'] })
  })
  .use((req: NextApiRequest, res: NextApiResponse, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.query['user']) {
      res.status(401).send('unauthenticated')
    } else {
      next()
    }
  })
  .post((req: NextApiRequest, res: NextApiResponse) => {
    const { name, password } = req.query
    let tuser = createUser({"email": name.toString(), "password": password.toString()});
    res.json(tuser)
  })
  .delete((req: NextApiRequest, res: NextApiResponse) => {
    let {email, password, role} = req.query 
    deletUser(email.toString(), password.toString(), role.toString())
    res.setHeader('Set-Cookie', [
      serialize('username', '', {
        maxAge: -1,
        path: '/',
      }),
      serialize('password', '', {
        maxAge: -1,
        path: '/',
      }),
    ]);
    res.status(302).setHeader('Location', '/login');
    res.status(204).end()
  })

export default handler