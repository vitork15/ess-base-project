import { IsDefined, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

class EditarPlaylistDTO{

    @IsString()
    @IsDefined()
    description: string

    @IsInt()
    @IsDefined()
    @Min(0)
    saveCount: number
}

export default EditarPlaylistDTO