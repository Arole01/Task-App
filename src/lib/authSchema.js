import * as yup from "yup";

export const registerSchema = yup.object({
  firstname: yup.string().required("Full name is required"),

  lastname: yup.string().required("Full name is required"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: yup.string().required("Password is required"),
});
