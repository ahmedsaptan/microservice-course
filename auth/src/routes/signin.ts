import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email Must be Valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a Password"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(existUser.password, password);
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = jwt.sign(
      { id: existUser.id, email: existUser.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existUser);
  }
);

export { router as signinRouter };
