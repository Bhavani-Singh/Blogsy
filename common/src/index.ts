import { z } from 'zod';

export const userSignupSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    about: z.string().min(1),
    password: z.string().min(8)
});

export type SignupType = z.infer<typeof userSignupSchema>;

export const userSiginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export type SigninType = z.infer<typeof userSiginSchema>;

export const blogSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(5),
    createdAt: z.string().min(1)
});

export type BlogType = z.infer<typeof blogSchema>;