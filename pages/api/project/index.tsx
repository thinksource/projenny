import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";

export default  (req: NextApiRequest, res: NextApiResponse)=>{
    res.json({hello: 'world', method: req.method});
}