import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from "cors";

// ============================================================
import { connectDB } from "./config/database.connection";
import Auth_Routes from "./routes/auth.routes";
import Account_Routes from "./routes/account.routes";
import Payment_Routes from "./routes/payment.routes";
import Activity_Routes from "./routes/activity.routes";
// ============================================================

dotenv.config();            // env configuration.

const app: Application = express();

app.use(cors());            //cors set up.

// body parsing
app.use(express.json());    // convert to json format
app.use(express.urlencoded({ extended: true }));


// Routes
// ============================================================
app.use("/api/auth", Auth_Routes);
app.use("/api/account", Account_Routes);
app.use("/api", Payment_Routes);
app.use("/api", Activity_Routes);
// ============================================================


let port: number = Number(process.env.PORT) || 3000;
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server Is Running on http://localhost${port}`);
    });
}
startServer();