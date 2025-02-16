import { IsDefined, IsInt, isInt, IsNotEmpty, IsOptional, IsString, IsDate } from "class-validator"

class CriarUserDTO{

    @IsInt()
    @IsOptional()
    userID: number

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    @IsDefined()
    login: string;

    @IsString()
    @IsDefined()
    email: string;

    @IsString()
    @IsDefined()
    password: string;

    @IsString()
    @IsOptional()
    birthday: Date;
}

export default CriarUserDTO