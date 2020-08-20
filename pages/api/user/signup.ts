import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect();

handler.post(async (req: NextApiRequest, rep: NextApiResponse)=>{
    // const {email, username}

})


export default handler;