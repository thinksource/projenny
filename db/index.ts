import "reflect-metadata";
import {getManager, createConnection, EntityManager, getConnectionManager, Db, getConnection, Connection} from "typeorm";
import crypto from 'crypto';
import { User } from "./entity/User";
// import { dbManager } from "../next-env";

export const pwhash = (contents: string, salt: string) => crypto.pbkdf2Sync(contents, salt, 1000, 64,'sha512').toString('hex');


// export const dbManager : Promise<EntityManager> = createConnection({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "admin",
//     password: "password",
//     database: "dyform",
//     entities: [__dirname + "./entity/*.js"],
//     synchronize: true
//   }).then(async connection => {

//     console.log("Inserting a new user into the database...");
//     // const user = new User();
//     // user.email = "test@gmail.com";
//     // user.salt = crypto.randomBytes(16).toString('hex');
//     // user.password = pwhash("test", user.salt);
//     // user.role = 'admin'
//     // await connection.manager.save(user);
//     // console.log("Saved a new user with id: " + user.id);

//     // console.log("Loading users from the database...");
//     // const users = await connection.manager.find(User);
//     // console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//     return connection.manager;

// }).catch(error => {throw error})

// export const db : EntityManager = dbManager.then(db => {return db})
const connManager = getConnectionManager();
const connection = connManager.create({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "password",
    database: "dyform",
});
// let dbinit= false
// const exe = async  () =>  {
//   await connection.connect();  
// };
// exe();
// // if (!connection.manager){
//     exe();
// }
// console.log('-------------------------------')
// console.log(connection.manager)

// const conn = createConnection({
//         type: "mysql",
//         host: "localhost",
//         port: 3306,
//         username: "admin",
//         password: "password",
//         database: "dyform",
//         entities: [__dirname + "./entity/*.js"],
//         synchronize: true
//       });
export const dbManager = connManager.get().manager;
// let t = false
// let dbconn : Connection
// let db = async function(mark: boolean)  {
//   if (!mark){
//     dbconn = await connection.connect()
//     mark = true;
//   }
//   return dbconn.manager
// }
// export const dbManager: EntityManager = () => {
//   try{
//     return db(t)
//   }catch(err){
//     throw 
//   }
// }

