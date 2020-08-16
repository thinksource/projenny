import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { Organization } from "./Organization";
import { Contact } from "./Contact";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar",{length: 350})
    expertise_required: string;

    @Column("simple-array")
    clinical_expertise: string[];

    @Column('tinyint')
    COVID_19: boolean;

    @Column(type => Contact)
    contact: Contact;

    @ManyToOne(type => Organization, org => org.id)
    organization: Organization;

    @Column('date')
    start: Date;

    @Column('date')
    end: Date;

    @Column('varchar')
    country: string;

    @Column('varchar')
    state: string;
}
