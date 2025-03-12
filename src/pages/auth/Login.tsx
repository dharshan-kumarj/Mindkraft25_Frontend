import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import bgImage from "/assets/login_bg.webp";
import karunyaLogo from "/assets/karunyalogo.webp";
import mkLogo from "/assets/mk_logo.webp";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const apiUrl = "https://api.mindkraft.org/user/login/";
    const payload = { email, password };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const userData = response.data;
        
        // Set cookie expiration time (30 minutes)
        const expirationTime = 1 / 48;
        
        // Save JWT tokens
        Cookies.set("accessToken", userData.access, { expires: expirationTime });
        Cookies.set("refreshToken", userData.refresh, { expires: expirationTime });
        
        // Save user information
        Cookies.set("userEmail", userData.email, { expires: expirationTime });
        Cookies.set("firstName", userData.first_name, { expires: expirationTime });
        Cookies.set("lastName", userData.last_name, { expires: expirationTime });
        Cookies.set("fullName", userData.full_name, { expires: expirationTime });
        Cookies.set("registerNo", userData.register_no, { expires: expirationTime });
        Cookies.set("mobileNo", userData.mobile_no, { expires: expirationTime });
        Cookies.set("mkid", userData.mkid, { expires: expirationTime });
        
        // Save boolean values as strings
        Cookies.set("intercollege", String(userData.intercollege), { expires: expirationTime });
        Cookies.set("isFaculty", String(userData.is_faculty), { expires: expirationTime });
        
        // Additional approach: Save the entire response as JSON
        Cookies.set("userData", JSON.stringify(userData), { expires: expirationTime });

        // Navigate to home page after successful login
        navigate("/events");
      }
    } catch (error) {
      setErrorMessage(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Invalid email or password!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative px-4"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    {/* Navbar (Mobile Responsive) */}
    <nav className="absolute top-5 left-5 right-5 flex items-center justify-between px-4 py-2  bg-opacity-50 rounded-lg md:top-10">
      {/* Logo */}
      <img src={karunyaLogo} alt="Karunya Logo" className="h-16 w-16 object-cover rounded-full" />
      
      {/* Title */}
      <a href="/" className="text-xl font-bold uppercase text-white tracking-wide md:text-2xl">
        MINDKRAFT 2K25
      </a>
      <div></div>
    </nav>

    {/* Login Container */}
    <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center text-center relative">
      {/* Floating Logo */}
      <div className="p-1 w-20 h-20 bg-white bg-opacity-90 backdrop-blur-md rounded-full flex justify-center items-center absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-md">
        <img src={mkLogo} alt="Logo" className="w-full h-full object-cover rounded-full" />
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

        {/* Password Field with Show Password Checkbox */}
        <div className="w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            required
            className="w-full mb-2 p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show Password Checkbox */}
          <div className="flex justify-center items-center mt-2">
            <label className="flex items-center space-x-2 text-white text-sm cursor-pointer my-3">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="w-4 h-4 text-blue-500 bg-transparent border-white rounded focus:ring-2 focus:ring-blue-400"
              />
              <span>Show Password</span>
            </label>
          </div>
        </div>

        {/* Login Button with Loading Spinner */}
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            "LOGIN"
          )}
        </button>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
      </form>

      {/* Additional Links */}
      <div className="w-full flex justify-between mt-4 text-sm">
        <a href="/register" className="text-blue-400 hover:underline">Don't have an account?</a>
        <a href="/forgotpassword" className="text-blue-400 hover:underline">Forgot password?</a>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;