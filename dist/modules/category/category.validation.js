"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" })
            .min(1, "Name cannot be empty"),
        description: zod_1.z.string({ required_error: "Description is required", })
            .min(1, "Description cannot be empty"),
        image: zod_1.z.string({ required_error: "Image is required", })
            .min(1, "Image cannot be empty").optional(),
    }),
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "ID is required" }).optional(),
        name: zod_1.z.string({ required_error: "Name is required" })
            .min(1, "Name cannot be empty").optional(),
        description: zod_1.z.string({ required_error: "Description is required", })
            .min(1, "Description cannot be empty").optional(),
        image: zod_1.z.string({ required_error: "Image is required", })
            .min(1, "Image cannot be empty").optional(),
    }),
});
exports.categoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema
};
