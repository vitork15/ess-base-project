import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
class Artist {

    @PrimaryColumn()
    login: string;

    @Column({nullable: false})
    name: string;
    
    @Column({nullable: false})
    email: string;
    
    @Column({nullable: false})
    password: string;
    
    @Column()
    bio?: string;
}

export default Artist