import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
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
    id: number;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column({
        type: "enum",
        enum: ["admin", "active", "deactive"],
        default: 'active'
    })
    role: UserRole;

    @Column('varchar')
    salt: string;

    @OneToMany(type => Organization, org => org.user)
    own_organization: Organization[];
    // @Column({
    //     type: 'enum',
    //     emun: ["admin", "active", 'deactive'],
    //     default: 'active'
    // })
    // role: UserRole



}
