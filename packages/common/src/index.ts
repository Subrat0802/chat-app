import {z} from "zod";

export const signupSchema = z.object({
    email:z.string().email("Invalid Email"),
    username: z.string().min(2, "Username must be at least 2 character"),
    password: z.string().min(4, "Password must be at least 4 character")
})

export const signinSchema = z.object({
    email:z.string().email("Invalid Email"),
    password: z.string().min(4, "Password must be at least 4 character")
})