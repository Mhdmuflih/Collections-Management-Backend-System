export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    role: "Admin" | "Manager" | "Agent" | "Viewer" 
}