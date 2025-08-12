import mongoose, { model, Schema } from "mongoose";
import { IPayment } from "../interface/models-interfaces/interface";

const paymentSchema: Schema = new Schema<IPayment>({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    method: {
        type: String
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

export default model<IPayment>("Payment", paymentSchema);