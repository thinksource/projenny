import {Entity, Column} from "typeorm";
import { ExecSyncOptionsWithBufferEncoding } from "child_process";
export enum PersonTitle {
    Mr = "Mr",
    Miss = "Miss",
    Dr = "Dr",
    Mrs ="Mrs",
    Ms = "Ms",
    Blank = ""
}

export class Contact {
    @Column({
        type: "enum",
        enum: PersonTitle,
        default: PersonTitle.Blank
        })
    title: string;

    @Column('varchar')
    first_name: string;

    @Column('varchar')
    last_name: string;

    @Column('varchar')
    job_title: string;

    @Column('varchar')
    email: string;

    @Column('tinyint')
    member: boolean;
}
