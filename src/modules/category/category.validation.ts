import { z } from "zod";

const createCategoryValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: "Name is required"})
        .min(1, "Name cannot be empty"),
        description: z.string({required_error: "Description is required",})
        .min(1, "Description cannot be empty"),
        image: z.string({ required_error: "Image is required", })
        .min(1, "Image cannot be empty").optional(),
    }),
})

const updateCategoryValidationSchema = z.object({
    body: z.object({
        id: z.string({required_error: "ID is required"}).optional(),
        name: z.string({required_error: "Name is required"})
       .min(1, "Name cannot be empty").optional(),
        description: z.string({required_error: "Description is required",})
       .min(1, "Description cannot be empty").optional(),
        image: z.string({ required_error: "Image is required", })
       .min(1, "Image cannot be empty").optional(),
    }),
})

export const categoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema
}