import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Organization } from "./Organization";
import { Contact } from "./Contact";

@Entity()
export class Technology {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar')
    name: string;

    @Column("varchar",{length: 350})
    brief: string;

    @Column('varchar')
    link: string;

    @Column('tinyint')
    COVID_19: boolean;

    @ManyToOne(type => Organization, org => org.id)
    organization: Organization;

    @Column(type => Contact)
    contact: Contact;

}
