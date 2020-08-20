import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next';
// import { Error } from 'typescript'
import {dbManager} from '../../../db'
import { Organization } from '../../../db/entity/Organization';
const handler = nextConnect();
handler.post(async (req: NextApiRequest, res: NextApiResponse)=>{
    const {name, brief, status, website, mailext, member} = req.body
    console.log(req.body)
    const org = new Organization();
    org.name = name
    org.brief = brief
    org.status = status
    org.website = website
    org.mailext = mailext
    org.people = undefined
    org.member = member
    console.log("--------");
    try{
        const result= await dbManager.save(org)
    console.log("====================");
    console.log(result)
    res.status(200).json(org)
    }catch(e){
        console.log("Error:", e)
    }
})

export default handler