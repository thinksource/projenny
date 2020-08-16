import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";
import {Contact} from "./Contact";
import { Organization } from "./Organization";

@Entity()
export class People {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type =>  People)
    @JoinColumn()
    user: User;

    @Column(type => Contact)
    contact: Contact;

    @ManyToOne(type => Organization, org => org.id)
    organization: Organization;

    @Column("simple-array")
    expertise: string[];

    @Column("boolean")
    COVID_19: boolean;

    @Column('varchar')
    country: string;

    @Column('varchar')
    state: string;
}
