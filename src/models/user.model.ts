import { model, Schema } from "mongoose";
import { IUser } from "../interface/models-interfaces/interface";

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
        required: false,
        default: false,
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

userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });


// // Unique email for login
// userSchema.index({ email: 1 }, { unique: true });

// // Role filter (RBAC)
// userSchema.index({ role: 1 });

// // Optional: If you list users by creation date a lot
// userSchema.index({ createdAt: -1 });

export default model<IUser>("User", userSchema);