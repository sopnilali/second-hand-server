import { z } from "zod";

const createListingValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title  is required",
          }).min(1, "Title cannot be empty"),
        description: z.string({
            required_error: "Listing description is required",
        }).min(1, "Listing description cannot be empty"),
        price: z.number({
            required_error: "Listing price is required",
        }).min(0, "Listing price cannot be less than 0"),
        condition: z.string({
            required_error: "Condition is required",
          }).min(1, "Condition cannot be empty"),
    })
});

const updateListingValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title  is required",
          }).min(1, "Title cannot be empty").optional(),
        description: z.string({
            required_error: "Listing description is required",
        }).min(1, "Listing description cannot be empty").optional(),
        price: z.number({
            required_error: "Listing price is required",
        }).min(0, "Listing price cannot be less than 0").optional(),
        condition: z.string({
            required_error: "Condition is required",
          }).min(1, "Condition cannot be empty").optional(),
    })
});




export const ListValidationSchema = {
    createListingValidationSchema,
    updateListingValidationSchema
}