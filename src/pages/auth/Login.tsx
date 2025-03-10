import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate(); // Use navigate for routing

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const apiUrl = "https://mindkraft25-backend.onrender.com/user/login/";
    const payload = { email, password };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("intercollege", response.data.intercollege);
        
        // Redirect to landing page
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Invalid email or password!");
      } else {
        setErrorMessage("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('src/assets/login_bg.webp')" }}
    >
      {/* Header Section */}
      <div className="absolute top-10 w-full flex justify-center items-center">
        <img
          src="src/assets/karunyalogo.webp"
          alt="Mindkraft Logo"
          className="h-20 w-20 object-cover rounded-full absolute left-5"
        />
        <h1 className="text-2xl font-bold uppercase text-white">MINDKRAFT 2K25</h1>
      </div>

      {/* Login Container */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg rounded-lg p-8 w-96 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="p-1 w-20 h-20 bg-white bg-opacity-90 backdrop-blur-md rounded-full flex justify-center items-center absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-md">
          <img
            src="src/assets/mk_logo.webp"
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h1 className="text-2xl font-bold mt-12 text-white">Login Now</h1>

        {/* Login Form */}
        <form className="w-full mt-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your Email"
            required
            className="w-full mb-4 p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            required
            className="w-full mb-4 p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me */}
          <div className="flex items-center justify-center mb-4">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-white">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            LOGIN
          </button>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
        </form>

        {/* Additional Links */}
        <div className="w-full flex justify-between mt-4 text-sm">
          <a href="/register" className="text-blue-400 hover:underline">
            Don’t have an account?
          </a>
          <a href="/forgotpassword" className="text-blue-400 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
