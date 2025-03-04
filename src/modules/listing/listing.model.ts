import { model, Schema } from "mongoose";
import { TListings } from "./listing.interface";


const listingSchema = new Schema(
    {
        
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: true
        },
        images: {
            type: [String],
            required: true,
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        status: {                    // Status of the listing
            type: String,
            enum: ['available', 'sold'],
            default: 'available'
        },
    },
    { timestamps: true }
)


const Listings = model<TListings>('listings', listingSchema)

export default Listings