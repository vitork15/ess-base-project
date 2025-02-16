import { IsDefined, IsInt, isInt, IsOptional, IsString, IsDate, ValidateIf } from "class-validator"

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
    @IsOptional()
    birthday: Date;

}

export default EditarUserDTO