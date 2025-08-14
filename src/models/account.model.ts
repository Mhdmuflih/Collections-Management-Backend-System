import mongoose, { model, Schema } from "mongoose";
import { IAccount } from "../interface/models-interfaces/interface";

const accountSchema: Schema = new Schema<IAccount>({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Deleted"],
        default: "Active"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
}, {timestamps: true});

accountSchema.index({ status: 1 });
accountSchema.index({ createdBy: 1 });
accountSchema.index({ email: 1, phone: 1 }); // Compound index
accountSchema.index({ createdAt: -1 });


// // Fast lookup by account number
// accountSchema.index({ accountNumber: 1 }, { unique: true });

// // Compound for filtering by status and sorting by created date
// accountSchema.index({ status: 1, createdAt: -1 });

// // If you often need only active/non-deleted accounts
// accountSchema.index({ isDeleted: 1, createdAt: -1 });


export default model<IAccount>("Account", accountSchema);