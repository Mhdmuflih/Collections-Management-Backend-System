import { model, Schema } from "mongoose";
import { IUser } from "../interface/models-interfaces/model.interface";

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Agent", "Viewer"],
        default: "Viewer"
    },
    isLocked: {
        type: Boolean,
        required: false
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default model<IUser>("User", userSchema);