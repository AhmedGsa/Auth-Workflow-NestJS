import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: "users"
})
export class User {
    @PrimaryColumn({
        type: "bigint"
    })
    id: number;
    @Column({
        name:"full_name",
        nullable: false
    })
    fullName: string;
    @Column({
        nullable: false
    })
    email: string;
    @Column({
        nullable: false
    })
    password: string;
}