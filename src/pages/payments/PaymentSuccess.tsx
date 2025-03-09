import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('src/assets/login_bg.webp')" }}
        >
            {/* Success Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg rounded-lg p-8 w-96  flex flex-col items-center text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-500 bg-opacity-30 backdrop-blur-md rounded-full flex justify-center items-center shadow-md">
                    <svg
                        className="w-12 h-12 text-green-400 animate-pulse"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Success Message */}
                <h1 className="text-2xl font-bold mt-6 text-white">Payment Successful!</h1>
                <p className="text-white text-opacity-80 mt-2">    
                    Thank you for registering for MindKraft 2K25. Your payment has been processed successfully. We look forward to seeing you at the event !!        </p>

                {/* Home Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-400 hover:scale-105 transition-transform"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
