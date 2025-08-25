import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(
        /^[A-Za-z0-9._-]+$/,
        "Username must be alphanumeric with . _ - allowed"
      ),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^[A-Za-z0-9!@#$%^&*()_+\-.]+$/,
        "Password can contain alphanumeric + special chars"
      ),

    confirmPassword: z.string(),

    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Must be a valid Google email"),

    phone: z
      .string()
      .regex(
        /^\+\d{1,3}\d{7,12}$/,
        "Phone must include country code (e.g. +919876543210)"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.username !== data.password, {
    message: "Username and password cannot be the same",
    path: ["password"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Must be a valid Google email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
