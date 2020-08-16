import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { CipherNameAndProtocol } from "tls";
import { User } from "./User";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('text')
    brief: string;

    @Column({
        type: "enum",
        enum: ["admin", "active", "deactive"],
        default: 'active'
    })
    status: string;

    @Column('varchar')
    website: string;

    @Column('simple-array')
    mailext: string[];

    @ManyToOne(type => User, user => user.own_organization)
    user: User;

    @Column('tinyint')
    member: boolean;

}
