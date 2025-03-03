
import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";


const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Category = model<ICategory>('category', categorySchema)

export default Category