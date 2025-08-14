import { IsOptional, IsString, IsEmail, Matches } from "class-validator";
import { Types } from "mongoose";

export class UpdateAccountDTO {
    @IsOptional()
    @IsString({ message: "Name must be a string" })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: "Email must be a valid email address" })
    email?: string;

    @IsOptional()
    @IsString({ message: "Phone must be a string" })
    @Matches(/^\+?[0-9]{7,15}$/, { message: "Phone must be a valid number" })
    phone?: string;

    @IsOptional()
    @IsString({ message: "Address must be a string" })
    address?: string;

    @IsOptional()
    createdBy?: Types.ObjectId;
}
