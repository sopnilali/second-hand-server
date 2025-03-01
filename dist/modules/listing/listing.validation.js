"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListValidationSchema = void 0;
const zod_1 = require("zod");
const createListingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title  is required",
        }).min(1, "Title cannot be empty"),
        description: zod_1.z.string({
            required_error: "Listing description is required",
        }).min(1, "Listing description cannot be empty"),
        price: zod_1.z.number({
            required_error: "Listing price is required",
        }).min(0, "Listing price cannot be less than 0"),
        condition: zod_1.z.string({
            required_error: "Condition is required",
        }).min(1, "Condition cannot be empty"),
    })
});
const updateListingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title  is required",
        }).min(1, "Title cannot be empty").optional(),
        description: zod_1.z.string({
            required_error: "Listing description is required",
        }).min(1, "Listing description cannot be empty").optional(),
        price: zod_1.z.number({
            required_error: "Listing price is required",
        }).min(0, "Listing price cannot be less than 0").optional(),
        condition: zod_1.z.string({
            required_error: "Condition is required",
        }).min(1, "Condition cannot be empty").optional(),
    })
});
exports.ListValidationSchema = {
    createListingValidationSchema,
    updateListingValidationSchema
};
