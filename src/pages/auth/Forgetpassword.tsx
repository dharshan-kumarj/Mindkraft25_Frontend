import React, { useState } from "react";
import axios from "axios";
import bgImage from "../../../public/assets/register_bg.webp"; // ✅ Importing background image correctly

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Verify OTP
    const [message, setMessage] = useState("");

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post("https://mindkraft25-backend.onrender.com/user/forgot-password/", { email });
            setMessage(response.data.message);
            setStep(2); // Move to OTP verification step
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Failed to send OTP");
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("https://mindkraft25-backend.onrender.com/user/reset-password/", {
                email,
                otp,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });
            setMessage(response.data.message);
            setStep(3); // Move to success message step
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div 
            className="m-0 font-sans bg-cover bg-center bg-fixed flex flex-col justify-center items-center h-screen"
            style={{ backgroundImage: `url(${bgImage})` }} // ✅ Fixed background image import
        >
            <div className="bg-white bg-opacity-10 rounded-lg p-8 w-96 shadow-lg backdrop-blur-md text-center">
                <h1 className="text-2xl font-bold mb-5 text-white">Forgot Password</h1>

                {message && <p className="text-green-400 mb-3">{message}</p>}

                {step === 1 && (
                    <form onSubmit={handleSendOTP}>
                        <p className="mb-5 text-white">Enter your email to reset your password</p>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mb-4 p-2.5 rounded border border-white border-opacity-30 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-blue-800 to-blue-400 rounded-lg text-white font-semibold transition-transform duration-200 hover:scale-105"
                        >
                            Send OTP
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleResetPassword}>
                        <p className="mb-3 text-white">Enter OTP and set a new password</p>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full mb-3 p-2.5 rounded border border-white border-opacity-30 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full mb-3 p-2.5 rounded border border-white border-opacity-30 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full mb-4 p-2.5 rounded border border-white border-opacity-30 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-blue-800 to-blue-400 rounded-lg text-white font-semibold transition-transform duration-200 hover:scale-105"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <p className="text-white">
                        Password reset successful! <br />
                        <a href="/login" className="text-blue-400 underline">Go to Login</a>
                    </p>
                )}

                <a href="/login" className="block mt-4 text-blue-400 no-underline hover:underline">Back to Login</a>
            </div>
        </div>
    );
};

export default ForgotPassword;
