import crypto from 'crypto';
import { User, UserRole} from '../db/entity/User';
import { pwhash, dbManager } from '../db';

const DEFAULT_USER_ROLE : UserRole = UserRole.active

export type UserData ={
    email: string,
    password: string,
    role?: UserRole
}

export async function createUser(user: UserData) {
    const tmp = new User();
    tmp.email = user.email;
    tmp.salt = crypto.randomBytes(16).toString('hex');
    tmp.password = pwhash(user.password, tmp.salt);
    tmp.role = user.role || DEFAULT_USER_ROLE;
    await dbManager.save(tmp)
    return {
        email: tmp.email, 
        role: user.role
    }
}

export async function findUser(email: string, password: string){
    const user = await dbManager.findOne(User, {email});
    if(user){
        const passwordhash = pwhash(password, user.salt);
        if( passwordhash === user.password){
            return {
                id: user.id,
                email, 
                role: user.role,
                status: 200
            }
        }else{
            throw new Error('User password is not correct');
        }
    }else{
        throw new Error('User not find with this email');
    }   
}

export async function deletUser(email: string, password: string, role: string){
    const user = await dbManager.findOne(User, {email});
    dbManager.update(User, user.id, {role: UserRole.blocked});
    if(user){
        const passwordhash = pwhash(password, user.salt);
        if( passwordhash === user.password || role === UserRole.admin){
            return {
                id: user.id,
                email, 
                role: UserRole.blocked,
                status: 200
            }
        }else{
            throw new Error('User password is not correct or you do not have authorit to do it');
        }
    }else{
        throw new Error('User not find with this email');
    }
}