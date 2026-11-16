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
    // .matches(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/,
    //   "Password should contain Capital letter,small letter and a number",
    // )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),

  occupation: yup
    .string()
    .trim()
    .required("Occupation is required")
    .min(2, "Occupation must be at least 2 characters")
    .max(50, "Occupation cannot exceed 50 characters"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    // .matches(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,10}$/,
    //   "Password should contain Capital letter,small letter and a number",
    // )
    .required("Password is required"),
});
