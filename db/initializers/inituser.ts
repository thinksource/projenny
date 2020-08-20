// import 'reflect-metadata';
import { User, UserRole } from '../entity/User';
import crypto from 'crypto';
import {dbManager, pwhash } from '..';

async function inituser() 
{
    const user = new User();
    user.email = 'sheng.lu@mq.edu.au';
    user.own_organization = []
    user.salt = crypto.randomBytes(16).toString('hex');
    user.password = pwhash("password", user.salt);
    user.role = UserRole.admin;
    await dbManager.save(user);
    const duser = await dbManager.findOne(User);
    return duser;
}
const duser = inituser();

console.log("Loaded users: ", duser);
