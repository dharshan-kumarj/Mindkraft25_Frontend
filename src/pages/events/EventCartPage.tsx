import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface EventDetail {
  eventid: string;
  eventname: string;
  description: string;
  type: string;
  category: number;
  category_name: string;
  division: string;
  start_time: string;
  end_time: string;
  price: string;
  participation_strength_setlimit: number;
}

interface CartData {
  id: number;
  MKID: number;
  user_mkid: string;
  events: string[];
  events_detail: EventDetail[];
  added_at: string;
  updated_at: string;
}

interface CartApiResponse {
  status: string;
  message: string;
  data: CartData[];
}

const EventCartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<EventDetail[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // API base URL
    const API_BASE_URL = "https://mindkraft25-backend.onrender.com"; // Change to your actual API base URL

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                setLoading(true);
                // Get access token from cookies
                const accessToken = Cookies.get('accessToken');
                
                if (!accessToken) {
                    throw new Error("Authentication token not found. Please log in again.");
                }

                console.log("Fetching cart data...");
                const response = await fetch(`${API_BASE_URL}/api/cart/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                });

                console.log("Cart API response status:", response.status);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch cart items");
                }

                const data: CartApiResponse = await response.json();
                console.log("Cart API response data:", data);
                
                if (data.status === "success" && data.data.length > 0) {
                    // Extract event details from the first cart item
                    const eventDetails = data.data[0].events_detail;
                    setCartItems(eventDetails);
                    calculateTotal(eventDetails);
                } else {
                    setCartItems([]);
                    setCartTotal(0);
                }
            } catch (err) {
                console.error("Error fetching cart:", err);
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [API_BASE_URL]);

    // Calculate the total price of the cart
    const calculateTotal = (items: EventDetail[]) => {
        const total = items.reduce((sum, item) => {
            // Parse the price - handle both string and number formats
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return sum + (isNaN(price) ? 0 : price);
        }, 0);
        setCartTotal(total);
    };

    // Remove an item from the cart
    const handleDelete = async (eventid: string) => {
        try {
            // Get access token from cookies
            const accessToken = Cookies.get('accessToken');
            
            if (!accessToken) {
                throw new Error("Authentication token not found. Please log in again.");
            }

            // This is a placeholder - you would need to implement the actual DELETE API call
            // based on your backend API specifications
            console.log("Removing event from cart:", eventid);
            
            // For now, we'll just update the UI without making an API call
            const updatedCart = cartItems.filter(item => item.eventid !== eventid);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
            
            // Show success message (you could implement a toast notification here)
            console.log("Item removed from cart");
            
        } catch (err) {
            console.error("Error removing item from cart:", err);
            // Show error message (you could implement a toast notification here)
        }
    };

    // Format price to display with 2 decimal places and ₹ symbol
    const formatPrice = (price: string | number) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return `₹${numPrice.toFixed(2)}`;
    };

    // Format date from ISO string to more readable format
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString();
        } catch (e) {
            return dateString;
        }
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
            <div className="max-w-4xl w-11/12 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-md shadow-lg mt-20 mb-4">
                <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Your Events</h2>
                
                {loading && (
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}
                
                {error && (
                    <div className="p-4 mb-4 bg-red-500 bg-opacity-50 rounded-lg text-white text-center">
                        {error}
                    </div>
                )}
                
                {!loading && !error && cartItems.length === 0 && (
                    <div className="p-8 text-center text-gray-300">
                        <p className="text-xl mb-4">Your cart is empty</p>
                        <p>Add events to your cart to see them here.</p>
                    </div>
                )}
                
                {!loading && !error && cartItems.length > 0 && (
                    <div id="cart-items" className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.eventid}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 mb-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
                            >
                                <div className="mb-3 md:mb-0">
                                    <h3 className="text-xl font-semibold text-gray-100">{item.eventname}</h3>
                                    <p className="text-gray-300">{item.description}</p>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm text-gray-400">
                                        <p><span className="font-semibold">Category:</span> {item.category_name}</p>
                                        <p><span className="font-semibold">Division:</span> {item.division}</p>
                                        <p><span className="font-semibold">Start:</span> {formatDate(item.start_time)}</p>
                                        <p><span className="font-semibold">End:</span> {formatDate(item.end_time)}</p>
                                        <p className="text-lg font-bold text-white">{formatPrice(item.price)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.eventid)}
                                    className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cart Total Container */}
            {!loading && !error && cartItems.length > 0 && (
                <div className="max-w-4xl w-11/12 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-md shadow-lg mb-8">
                    <h2 className="text-xl font-bold text-gray-200 mb-4">Cart Summary</h2>
                    <div className="flex justify-between items-center py-4 border-t border-gray-600">
                        <p className="text-lg text-gray-300">Total Amount</p>
                        <p className="text-2xl font-bold text-white">{formatPrice(cartTotal)}</p>
                    </div>
                    <button className="w-full py-4 bg-purple-600 text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition-colors mt-4">
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventCartPage;