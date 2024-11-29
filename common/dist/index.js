"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = exports.userSiginSchema = exports.userSignupSchema = void 0;
const zod_1 = require("zod");
exports.userSignupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1),
    about: zod_1.z.string().min(1),
    password: zod_1.z.string().min(8)
});
exports.userSiginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.blogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(5),
    createdAt: zod_1.z.string().min(1)
});
