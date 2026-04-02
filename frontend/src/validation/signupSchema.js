import * as Yup from "yup";

export const schema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),

  dob: Yup.date()
  .transform((value, originalValue) =>
    originalValue === "" ? null : value
  )
  .nullable()
  .required("Date of birth is required")
  .test("age-check", "You must be at least 13 years old", function (value) {
    if (!value) return false;

    const today = new Date();
    const birthDate = new Date(value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 13;
  }),
  
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),

  address: Yup.string().required("Address is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});