import { IsArray, isDefined, IsDefined, IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

class SearchDTO{
    
    @IsString()
    @IsDefined()
    description:string
    
}
export default SearchDTO