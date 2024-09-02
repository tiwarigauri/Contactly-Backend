import express from "express";
import { Register, Login, Auth } from "../controller/userController.js";
const router = express.Router();
import { body } from "express-validator";
import { verifyUser } from "../middleware/VerifyUser.js";
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controller/contactController.js";

// user routes
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name Should Not be Empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email Should Not be Empty")
      .isEmail()
      .withMessage("Invalid Email !!!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should Not be Empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password Length be 5-30"),
  ],
  Register
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email Should Not be Empty")
      .isEmail()
      .withMessage("Invalid Email !!!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should Not be Empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("Password Length be 5-30"),
  ],
  Login
);

router.get("/verify", verifyUser, Auth);

// contact routes
router.post("/add-contact", verifyUser, createContact);
router.get("/contacts", verifyUser, getContacts);
router.get("/contact/:id", verifyUser, getContact);
router.put("/update-contact/:id", verifyUser, updateContact);
router.delete("/contact/:id", verifyUser, deleteContact);

export { router as Router };
