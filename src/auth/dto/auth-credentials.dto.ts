import { IsString, IsEmail, IsNumber, IsPositive, MaxLength, MinLength, Length } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @IsPositive()
    mobile: number;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}