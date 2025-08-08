import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from "cors";

// ============================================================
import { connectDB } from "./config/database.connection";
// ============================================================

dotenv.config();    // env configuration.

const app: Application = express();

app.use(cors());    //cors set up.

let port: number = Number(process.env.PORT) || 3000;
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server Is Running on http://localhost${port}`);
    });
}
startServer();