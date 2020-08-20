import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, } from "typeorm";
import { Organization } from "./Organization";
import { Contact } from "./Contact";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar",{length: 1000})
    expertise_required?: string;

    @Column("simple-array")
    clinical_expertise?: string[];

    @Column('tinyint')
    COVID_19!: boolean;

    @OneToOne(type => Contact)
    @JoinColumn()
    contact!: Contact;

    @ManyToOne(type => Organization, org => org.id)
    organization!: Organization;

    @Column('date')
    start!: Date;

    @Column('date')
    end!: Date;

}
