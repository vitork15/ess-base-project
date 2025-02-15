import { IsDefined, IsInt, isInt, IsOptional, IsString } from "class-validator"

class EditarUserDTO{

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    @IsDefined()
    login: string;

    @IsString()
    @IsDefined()
    password: string;

    @IsString()
    birthday: Date;

}

export default EditarUserDTO