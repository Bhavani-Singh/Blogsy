import { z } from 'zod';
export declare const userSignupSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    about: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    about: string;
    password: string;
}, {
    email: string;
    name: string;
    about: string;
    password: string;
}>;
export type SignupType = z.infer<typeof userSignupSchema>;
export declare const userSiginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof userSiginSchema>;
export declare const blogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    createdAt: string;
}, {
    title: string;
    content: string;
    createdAt: string;
}>;
export type BlogType = z.infer<typeof blogSchema>;
