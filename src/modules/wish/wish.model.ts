import { model, Schema } from "mongoose";
import { IWish } from "./wish.interface";


const wishSchema = new Schema<IWish>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'listings',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
})

const WishModel = model<IWish>('wish', wishSchema)

export default WishModel;