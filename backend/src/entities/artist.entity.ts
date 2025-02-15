import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity()
class Artist {

    @PrimaryColumn()
    login: string;

    @Column({nullable: false, unique: true})
    name: string;
    
    @Column({select: false, nullable: false, unique: true})
    email: string;
    
    @Column({select: false, nullable: false})
    password: string;
    
    @Column()
    bio?: string;
}

export default Artist