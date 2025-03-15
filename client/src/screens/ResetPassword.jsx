import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { toast } from "react-toastify";
import resetImage from "../assets/header_img.png";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isEmailSent,setIsEmailSent] = useState(false);
  const [isOtpSubmitted,setIsOtpSubmitted] = useState(false);
  const [otp,setOtp] = useState("");
  const [newPassword,setNewPassword] = useState("");

  function sendOtptoEmail() {
    axios
      .post("/users/send-otp", { email })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsOtpSent(true);
        } else {
          toast.error(res.data.message);
        }
        setIsEmailSent(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to send OTP. Please try again.");
      });
  }

  function handleOtpChange() {
    setIsOtpSubmitted(true);

}

  function resetPassword(){
    axios.post('/users/reset-password',{email,otp,newPassword}).then(res=>{
      console.log(res.data);
      toast.success(res.data.message);
      navigate('/login')
    }).catch(err=>{
      console.log(err)
      toast.error("Failed to reset password. Please try again.")
    })
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r animate-fade-in-down from-blue-100 to-blue-300">
      {/* Email Input Form */}
      {!isEmailSent && (
        <div className="flex animate-fade-in-down w-4/5 max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
          <div className="w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-black text-2xl font-semibold mb-6 text-center">
              Reset Your Password
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                  Email Address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your registered email"
                  required
                />
              </div>
              <button
                type="button"
                onClick={sendOtptoEmail}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-xl"
              >
                Send OTP
              </button>
            </form>
            <p className="text-gray-700 text-center mt-6">
              Remembered your password?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>

          <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
            <img src={resetImage} alt="Reset Password Illustration" className="w-2/3" />
          </div>
        </div>
      )}

      {/* OTP Input Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium animate-fade-in-down" htmlFor="otp">
              Enter OTP
            </label>
            <input
              onChange={(e)=>setOtp(e.target.value)}
              type="text"
              id="otp"
              maxLength="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-xl"
              placeholder="6-digit OTP"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleOtpChange}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-500 transition duration-300 shadow-md hover:shadow-xl"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* Password Reset Form */}
      {isOtpSubmitted && isEmailSent && (
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium animate-fade-in-down" htmlFor="password">
              Enter New Password
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-xl"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="button"
            onClick={resetPassword}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-500 transition duration-300 shadow-md hover:shadow-xl"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
