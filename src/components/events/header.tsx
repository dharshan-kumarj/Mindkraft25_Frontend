import React from "react";


const Header: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1e0635] shadow-md">
      {/* Left Logo */}
      <img
        src="/src/assets/karunyalogo.webp"
        alt="Karunya Logo"
        className="h-12 w-auto"
      />

      {/* Title (Hidden on Small Screens) */}
      <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
        MINDKRAFT 2K25
      </h1>

      {/* Cart Button */}
      {/* <button
        onClick={() => navigate("/cart")} // React Router Navigation
        className="relative bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-all flex items-center"
      >
        <i className="fa-solid fa-cart-shopping text-lg "></i>
        <span className="hidden md:inline">Cart</span>
      </button> */}
    </nav>
  );
};

export default Header;
