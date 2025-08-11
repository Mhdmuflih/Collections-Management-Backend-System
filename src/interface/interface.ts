import { JwtPayload } from "jsonwebtoken";

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