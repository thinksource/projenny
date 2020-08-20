import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import auth from '../../../middleware/auth'
import passport from '../../../lib/passport'

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res){
    res.status(405).json({error:`Method ${req.method} Not Allowed`});
  }
})

handler
// .use(auth)
.post( async (req: NextApiRequest, res: NextApiResponse) => {
  const {username}= req.body;
  res.status(200).json({ 
    name: username
    })
}).get((req: NextApiRequest, res: NextApiResponse)=>{
  res.status(200).json({
    Msg: "test success"
  })
  
})

export default handler
   