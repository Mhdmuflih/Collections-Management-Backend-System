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

paymentSchema.index({ account: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ paymentDate: -1 });
paymentSchema.index({ recordedBy: 1 });


export default model<IPayment>("Payment", paymentSchema);