import bcrypt from "bcryptjs";

export const passwordHashing = async (password: string): Promise<string | undefined> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.log("Failed To hash Password: ", error.message);
        }else {
            console.log("An Unknown error occurred while create hased password.");
        }
    }
}

export const passwordCompaire = async (inputPassword: string, dbPassword: string): Promise<boolean | undefined> => {
    try {
        const compairedPassword = await bcrypt.compare(inputPassword, dbPassword);
        return compairedPassword;
    } catch (error: unknown) {
        if(error instanceof Error) {
            console.log("Failed To compaire password: ", error.message);
        }else {
            console.log("An Unknown error occurred while compaire password.");
        }
    }
}