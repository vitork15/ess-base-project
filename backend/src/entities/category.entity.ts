import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

class Category{

    @PrimaryGeneratedColumn()
    categoryID:number
    @Column({nullable:false})
    categoryName:string

}
export default Category

