import React from 'react';

const ForgotPassword: React.FC = () => {
    return (
        <div className="m-0 font-sans bg-cover bg-center bg-fixed flex flex-col justify-center items-center h-screen"
             style={{ backgroundImage: "url('src/assets/register_bg.webp')" }}>
            <div className="bg-white bg-opacity-10 rounded-lg p-8 w-96 shadow-lg backdrop-blur-md text-center">
                <h1 className="text-2xl font-bold mb-5 text-white">Forgot Password</h1>
                <p className="mb-5 text-white">Enter your email to reset your password</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Enter your Email"
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
                <a
                    href="/"
                    className="block mt-4 text-blue-400 no-underline hover:underline"
                >
                    Back to Login
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;