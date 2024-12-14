import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits long")
    .max(15, "Contact number must be less than 15 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  address: z.string().optional(),
});

export default registerValidationSchema;
