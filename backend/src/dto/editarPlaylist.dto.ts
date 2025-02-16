import { IsArray, IsDefined, IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

class EditarPlaylistDTO{

    @IsString()
    @IsDefined()
    description: string

    @IsInt()
    @IsDefined()
    @Min(0)
    saveCount: number

    @IsDefined()
    @IsArray()
    @IsInt({each:true})
    songIds: number[]
}

export default EditarPlaylistDTO