import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginUserDTO {
    @IsEmail({}, { message: "Email must be a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email!: string;

    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password is required" })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        { message: "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number and 1 special character" }
    )
    password!: string;
}