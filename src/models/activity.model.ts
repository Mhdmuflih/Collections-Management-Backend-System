import mongoose, { model, Schema } from "mongoose";
import { IActivity } from "../interface/models-interfaces/interface";

const activitySchema: Schema = new Schema<IActivity>({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

export default model<IActivity>("Activity", activitySchema);