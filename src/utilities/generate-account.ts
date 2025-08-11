import { v4 as uuidv4 } from "uuid";

export const generateAccountNumber = (): string => {
    const prefix: string = "ACC";
    const uuidPart: string = uuidv4().replace(/-/g, "").slice(0, 10).toUpperCase();
    return `${prefix}${uuidPart}`;
};