import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Manager" | "Agent" | "Viewer" 
};

export interface ILoginUser {
    email: string;
    password: string;
};

export interface IAuthTokenPayload extends JwtPayload {
    userId: string;
    role: string;
};


export interface ICreateAccount {
    name: string;
    email: string;
    phone: string;
    address: string;
    createdBy: Types.ObjectId;
}