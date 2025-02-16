import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class Category{

    @PrimaryGeneratedColumn()
    categoryID:number

    @Column({nullable:false})
    categoryName:string

}
export default Category

