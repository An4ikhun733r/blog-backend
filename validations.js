import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 5 }),
  body("fullName", "Invalid full name: length should be more than 3"),
  body("avatarUrl", "Invalid avatar").optional().isURL(),
];

export const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Enter title of the post").isLength({ min: 3 }).isString(),
  body("text", "Enter text of the post").isLength({ min: 3 }).isString(),
  body("tags", "Invalid tag format").optional().isArray(),
  body("imageUrl", "Invalid link of image").optional().isString(),
];
