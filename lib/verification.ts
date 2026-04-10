import { z } from "zod";

export const postSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),
    body: z
        .string()
        .min(1, 'Body is required')
        .min(10, 'Body must be at least 10 characters')
        .max(500, 'Body must be less than 500 characters'),
});

export type PostFormValues = z.infer<typeof postSchema>;
