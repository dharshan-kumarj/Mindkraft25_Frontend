import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Import assets correctly from `src/asset
import bgImage from "../../../public/assets/login_bg.webp"
import karunyaLogo from "../../../public/assets/karunyalogo.webp";
import mkLogo from "../../../public/assets/mk_logo.webp";

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

    const apiUrl = "https://mindkraft25-backend.onrender.com/user/login/";
    const payload = { email, password };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const { access, refresh, email, intercollege } = response.data;

        Cookies.set("accessToken", access, { expires: 1 / 48 });
        Cookies.set("refreshToken", refresh, { expires: 1 / 48 });
        Cookies.set("userEmail", email, { expires: 1 / 48 });
        Cookies.set("intercollege", intercollege.toString(), { expires: 1 / 48 });

        navigate("/");
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
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImage})` }} // ✅ Fixed background image
    >
      {/* Header Section */}
      <div className="absolute top-10 w-full flex justify-center items-center">
        <img
          src={karunyaLogo} // ✅ Using imported logo
          alt="Karunya Logo"
          className="h-20 w-20 object-cover rounded-full absolute left-5"
        />
        <a href="/" className="">
        <h1 className="text-2xl font-bold uppercase text-white">MINDKRAFT 2K25</h1>
        </a>
      </div>

      {/* Login Container */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg rounded-lg p-8 w-96 flex flex-col items-center text-center relative">
        {/* Logo */}
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
          <a href="/register" className="text-blue-400 hover:underline">Don’t have an account?</a>
          <a href="/forgotpassword" className="text-blue-400 hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;