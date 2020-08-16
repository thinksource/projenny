import "reflect-metadata";
import {getManager, createConnection, EntityManager, getConnectionManager, Db, getConnection} from "typeorm";
import crypto from 'crypto';
import { User } from "./entity/User";

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
// export const connManager = getConnectionManager();
// const connection = connManager.create({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "admin",
//     password: "password",
//     database: "dyform",
// });
// const exe = async  () =>  {
//   await connection.connect();
// };
// exe();
createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "admin",
        password: "password",
        database: "dyform",
        entities: [__dirname + "./entity/*.js"],
        synchronize: true
      });
export const dbManager = getConnection().manager;

