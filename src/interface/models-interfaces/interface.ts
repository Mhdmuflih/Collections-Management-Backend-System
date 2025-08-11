import { Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Manager" | "Agent" | "Viewer";
    isLocked?: boolean;
    failedAttempts?: number;
    createdAt?: Date;
}


export interface IAccount extends Document {
    accountNumber: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: "Active" | "Inactive" | "Deleted";
    balance: number;
    isDeleted: boolean;
    createdBy: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IPayment extends Document {
    account : Types.ObjectId;
    amount: number;
    status: "pending" | "complete" | "failed";
    method: "string";
    paymentDate: Date;
    recordedBy: Types.ObjectId;
}


export interface IActivity extends Document {
    account: Types.ObjectId;
    action: string;
    performedBy: Types.ObjectId;
    description: string;
    createdAt?: Date
}