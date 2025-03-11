import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundImage from "/assets/login_bg.webp"; // Import background image directly

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userDetails, setUserDetails] = useState<{ name: string; url: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Extract parameters from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transaction_id");
    const regNo = queryParams.get("regno");
    const phoneNo = queryParams.get("phone");

    useEffect(() => {
        if (transactionId && (regNo || phoneNo)) {
            // Build API URL with all available parameters
            let apiUrl = `https://mindkraft.org/payment/registered?transaction_id=${transactionId}`;
            
            // Add registration number if available
            if (regNo) {
                apiUrl += `&regno=${regNo}`;
            }
            
            // Add phone number if available
            if (phoneNo) {
                apiUrl += `&phone=${phoneNo}`;
            }
            
            // Fetch user details from the API
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch user details");
                    }
                    return response.json();
                })
                .then((data) => {
                    // Assuming the API returns { name: string, url: string }
                    setUserDetails(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            const missingParams = [];
            if (!transactionId) missingParams.push("Transaction ID");
            if (!regNo && !phoneNo) missingParams.push("Registration Number or Phone Number");
            
            setError(`Required parameters missing: ${missingParams.join(", ")}`);
            setLoading(false);
        }
    }, [transactionId, regNo, phoneNo]);

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Success Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg rounded-lg p-8 w-96 flex flex-col items-center text-center">
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
                {loading ? (
                    <p className="text-white text-opacity-80 mt-2">Loading user details...</p>
                ) : error ? (
                    <p className="text-red-500 text-opacity-80 mt-2">{error}</p>
                ) : userDetails ? (
                    <>
                        <p className="text-white text-opacity-80 mt-2">
                            Thank you, <span className="font-semibold">{userDetails.name}</span>, for registering for MindKraft 2K25. Your payment has been processed successfully.
                        </p>
                        <p className="text-white text-opacity-80 mt-2">
                            Your registration URL:{" "}
                            <a href={userDetails.url} className="text-purple-400 hover:underline">
                                {userDetails.url}
                            </a>
                        </p>
                    </>
                ) : (
                    <p className="text-white text-opacity-80 mt-2">No user details found.</p>
                )}

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