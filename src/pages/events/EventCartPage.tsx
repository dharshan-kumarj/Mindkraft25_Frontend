import React, { useEffect, useState } from "react";

interface CartItem {
    title: string;
    price: string;
}

const EventCartPage: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
        calculateTotal(storedCart);
    }, []);

    // Calculate the total price of the cart
    const calculateTotal = (cartItems: CartItem[]) => {
        const total = cartItems.reduce((sum, item) => sum + parseInt(item.price, 10), 0);
        setCartTotal(total);
    };

    // Remove an item from the cart
    const handleDelete = (index: number) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('src/assets/register_bg.webp')" }}
        >
            {/* Header Section */}
            <div className="absolute top-5 w-full flex justify-center items-center">
                <img
                    src="src/assets/karunyalogo.webp"
                    alt="Left Logo"
                    className="h-20 w-20 object-cover rounded-full absolute left-5"
                />
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold uppercase text-white">MINDKRAFT 2K25</h1>
                    <img
                        src="src/assets/mk_logo.webp"
                        alt="Right Logo"
                        className="h-16 w-16 object-cover rounded-full"
                    />
                </div>
            </div>

            {/* Event Cart Container */}
            <div className="max-w-4xl w-11/12 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-md shadow-lg mt-20">
                <h2 className="text-xl font-bold text-gray-200 mb-4">Your Events</h2>
                <div id="cart-items">
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-4 mb-4 bg-gray-800 bg-opacity-50 rounded-lg"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
                                <p className="text-gray-300">₹{item.price}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Total Container */}
            <div className="max-w-4xl w-11/12 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-md shadow-lg mt-4">
                <h2 className="text-xl font-bold text-gray-200 mb-4">Cart Total</h2>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-300">Total</p>
                    <p className="text-lg font-bold text-white">₹{cartTotal}</p>
                </div>
                <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default EventCartPage;