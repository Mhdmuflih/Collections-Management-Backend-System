import mongoose from "mongoose";
import User from "../models/user.model";
import Account from "../models/account.model";
import Payment from "../models/payment.model";
import Activity from "../models/activity.model";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongoURL as string, { dbName: "collectionsApp", maxPoolSize: 100, minPoolSize: 10, serverSelectionTimeoutMS: 5000, autoIndex: true });
        console.log(`MongoDB Connected Successfully: ${connect.connection.host}`);
        await Promise.all([
            User.syncIndexes(),
            Account.syncIndexes(),
            Payment.syncIndexes(),
            Activity.syncIndexes()
        ]);
        console.log("✅ All indexes synced successfully");
    } catch (error) {
        if (error instanceof Error) {
            console.log("Failed to connect the MongoDB.", error.message);
        } else {
            console.log("An unknown error occurred while connecting to MongoDB.");
        }
        process.exit(1);
    }
}