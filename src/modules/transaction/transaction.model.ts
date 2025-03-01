import { model, Schema } from "mongoose";
import { TTransaction } from "./transaction.interface";

const transactionSchema = new Schema({
    itemID: {
        type: Schema.Types.ObjectId,
        ref: 'listings',
        required: true
    },
    buyerID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    sellerID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {                    // Status of the listing
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      }
},
{ timestamps: true }

)

const Transaction = model<TTransaction>('transactions', transactionSchema)

export default Transaction