import * as yup from "yup";

const validatePhoto = (file) => {
  if (!file) {
    return true; // Allow empty photo
  }

  const allowedTypes = ["image/jpeg", "image/png"];
  const maxSize = 1024 * 1024; // 1MB

  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Please select a JPEG or PNG image.";
  }

  if (file.size > maxSize) {
    return "File size is too large. Maximum allowed size is 1MB.";
  }

  return true; // Valid photo
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginValidation = yup.object().shape({
  userId: yup
    .string()
    .required("Username or email is required")
    .test("isUsernameOrEmail", "Invalid email", (value) => {
      return emailRegex.test(value) || value.length >= 3;
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

export const registerValidation = yup.object().shape({
  fullName: yup.string(),
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .matches(
      /^[a-zA-Z0-9_.-]+$/,
      "Username can only contain letters, numbers and (., _, -)"
    ),
  email: yup
    .string()
    .required("Email is required")
    .test("isValidEmail", "Invalid email", (value) => {
      return emailRegex.test(value);
    }),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  avatar: yup
    .mixed() // Handle photo validation based on your requirements
    .required("Please upload a photo")
    .test("isPhotoUploaded", "Please upload a photo", (value) => value && value.length > 0)
});
