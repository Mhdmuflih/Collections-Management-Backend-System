import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { Types } from "mongoose";

export class CreatePaymentDTO {
    @IsNumber({}, { message: "Amount must be a number" })
    @Min(0, { message: "Amount must be at least 0" })
    amount!: number;

    @IsString({ message: "Method must be a string" })
    @IsNotEmpty({ message: "Payment method is required" })
    method!: string;
}
