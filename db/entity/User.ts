import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index} from "typeorm";
import { Organization } from "./Organization";
// export type UserState = "active" | "deactive"
export enum UserRole {
    admin = "admin",
    active = "active",
    blocked = "blocked"
}  


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    @Index()
    email!: string;

    @Column('varchar')
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: 'active'
    })
    role!: UserRole;

    @Column('varchar')
    salt!: string;

    // @Column({
    //     type: 'enum',
    //     emun: ["admin", "active", 'deactive'],
    //     default: 'active'
    // })
    // role: UserRole

}
