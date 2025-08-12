import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";

// ============================================================
import { connectDB } from "./config/database.connection";
import Auth_Routes from "./routes/auth.routes";
import Account_Routes from "./routes/account.routes";
import Payment_Routes from "./routes/payment.routes";
import Activity_Routes from "./routes/activity.routes";
import morgan from "morgan";
import logger from "./middlewares/logger.middleware";
import { HTTP_STATUS } from "./constants/http-status";
import { MESSAGES } from "./constants/messages";
// ============================================================

dotenv.config();            // env configuration.

const app: Application = express();

app.use(cors());            //cors set up.

app.use(morgan("tiny"));

// Custom logging middleware
// ============================================================
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// ============================================================

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


// 404 error throw
// ============================================================
// after all routes
app.all(/.*/, (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.ROUTE_NOT_FOUND });
});

// ============================================================


let port: number = Number(process.env.PORT) || 3000;
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server Is Running on http://localhost${port}`);
    });
}
startServer();