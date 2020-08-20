import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { CipherNameAndProtocol } from "tls";
import { User } from "./User";
import { Person } from "./Person";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    name!: string;

    @Column('text')
    brief?: string;

    @Column({
        type: "enum",
        enum: ["admin", "active", "deactive"],
        default: 'active'
    })
    status!: string;

    @Column('varchar')
    website!: string;

    @Column('simple-array')
    mailext!: string[];

    @ManyToOne(type => Person, p => p.belong_organization, {cascade: true})
    people?: Person[];

    @Column('tinyint')
    member!: boolean;

}
