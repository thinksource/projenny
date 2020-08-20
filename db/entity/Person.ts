import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import {Contact} from "./Contact";
import { Organization } from "./Organization";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;


    @ManyToOne(type => Organization, org => org.people,  {eager: true})
    @JoinColumn()
    belong_organization!: Organization;

    @Column("simple-array")
    expertise?: string[];

    @Column("boolean")
    COVID_19!: boolean;

    @OneToMany(type => Contact, contact => contact.person)
    contact?: Contact[];
}
