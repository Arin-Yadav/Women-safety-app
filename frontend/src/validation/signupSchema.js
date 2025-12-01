import * as Yup from "yup";

export const schema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .min(13, "You must be atleast 13")
    .required("Age is required"),
  dob: Yup.date().required("Date of birth is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});
