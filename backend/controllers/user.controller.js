import userModel from "../models/user.models.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";
import transporter from "../services/nodemailer.service.js";
import bcrypt from "bcryptjs";

// one transporter  used in login , reset otp

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);

    const token = await user.generateJWT();
    // to prevent sending password to the frontend
    delete user._doc.password;
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", errors: errors.array() });
    // console.log(errors.array())
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = await user.generateJWT();
    delete user._doc.password; // Remove password from response

    // const mailOptions = {
    //     from: process.env.SENDER_EMAIL,
    //     to: user._doc.email,
    //     subject: "Welcome to our AI based Project Management and Colloboration Platform",
    //     text: `Hello ,Welcome to our website. We are glad to have you here. We are Open for the further improvements and suggestions `,
    //   };

    // await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Login Successful!", user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


// profile controller should run only for authenticated users therefore we will create a middleware
export const profileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    user: req.user,
  });
};


export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    res.status(200).json({
      message: "Loggout out Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};


export const getAllUserController = async (req, res) => {
  try {
    //note that in this particular route we will not give the users who are currently logged in
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    const allUsers = await userService.getAllUsers({
      userId: loggedInUser._id,
    });
    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};


export const sendResetOtp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Error", errors: errors.array() });
  }

  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000;

    await user.save();

    // Send OTP via email
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for resetting your password is <b>${otp}</b>. Use this OTP to proceed with resetting your password.</p>`,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return res
        .status(500)
        .json({ message: "Failed to send OTP", error: mailError.message });
    }

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in sendResetOtp:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // finding user by email
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP Expired " });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    return res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

