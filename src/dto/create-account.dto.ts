import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";
import { Types } from "mongoose";

export class CreateAccountDTO {
    @IsString({ message: "Name must be a string" })
    @IsNotEmpty({ message: "Name is required" })
    name!: string;

    @IsEmail({}, { message: "Email must be a valid email address" })
    @IsNotEmpty({ message: "Email is required" })
    email!: string;

    @IsString({ message: "Phone must be a string" })
    @IsNotEmpty({ message: "Phone is required" })
    @Matches(/^\+?[0-9]{7,15}$/, { message: "Phone must be a valid number" })
    phone!: string;

    @IsString({ message: "Address must be a string" })
    @IsNotEmpty({ message: "Address is required" })
    address!: string;

    @IsNotEmpty({ message: "createdBy is required" })
    createdBy!: Types.ObjectId;
}
