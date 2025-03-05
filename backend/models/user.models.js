import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be 3 characters"],
      maxLength: [50, "Name must not be longer than 50 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [6, "Email must be 6 characters"],
      maxLength: [50, "Email must not be longer than 50 characters"],
    },
    password: {
      type: String,
      required: true,
      select: false, // This ensures the password is not returned by default in queries
    }, 
    resetOtp:{
      type:String,
      default:''
    },
    resetOtpExpireAt:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateJWT = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24h", 
  });
};

const User = mongoose.model("User", userSchema);

export default User;