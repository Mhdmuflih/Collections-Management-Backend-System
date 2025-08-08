import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongoURL as string, { dbName: "collectionsApp", maxPoolSize: 100, minPoolSize: 10, serverSelectionTimeoutMS: 5000 });
        console.log(`MongoDB Connected Successfully: ${connect.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Failed to connect the MongoDB.", error.message);
        } else {
            console.log("An unknown error occurred while connecting to MongoDB.");
        }
        process.exit(1);
    }
}