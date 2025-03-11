import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

interface MindkraftEvent {
    EVENTTYPE: string;
    QUANTITY: number;
    FEECODE: string;
    EVENTFROMDATE: string;
    EVENTTODATE: string;
    EVENTREGISTRATIONLASTDATE: string;
}

interface PaymentRequestBody {
    RegistrationNumber: string;
    StudentName: string;
    StudentMobileNumber: string;
    StudentEmail: string;
    RegisteredMindkraftEvents: MindkraftEvent[];
}

const EventCartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<EventDetail[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [processingPayment, setProcessingPayment] = useState<boolean>(false);

    const API_BASE_URL = "https://mindkraft25-backend.onrender.com"; // Update this if needed

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                setLoading(true);
                const accessToken = Cookies.get("accessToken");

                if (!accessToken) {
                    throw new Error("Authentication token not found. Please log in again.");
                }

                console.log("Fetching cart data...");
                const response = await fetch(`${API_BASE_URL}/api/cart/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log("Cart API response status:", response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch cart items");
                }

                const data: CartApiResponse = await response.json();
                console.log("Cart API response data:", data);

                if (data.status === "success" && data.data.length > 0) {
                    const eventDetails = data.data.flatMap(cart => cart.events_detail);
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
    }, []);

    const calculateTotal = (items: EventDetail[]) => {
        const total = items.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            return sum + price;
        }, 0);
        setCartTotal(total);
    };

    const handleDelete = async (eventid: string) => {
        try {
            const accessToken = Cookies.get("accessToken");

            if (!accessToken) {
                throw new Error("Authentication token not found. Please log in again.");
            }

            console.log("Removing event from cart:", eventid);

            const updatedCart = cartItems.filter((item) => item.eventid !== eventid);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);

            console.log("Item removed from cart");
        } catch (err) {
            console.error("Error removing item from cart:", err);
        }
    };

    const formatPrice = (price: string | number) => {
        const numPrice = parseFloat(price as string) || 0;
        return `₹${numPrice.toFixed(2)}`;
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleString();
        } catch (e) {
            return dateString;
        }
    };

    // Format date to YYYY-MM-DD for API request
    const formatDateForApi = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
        } catch (e) {
            // Default to current date if parsing fails
            return new Date().toISOString().split('T')[0];
        }
    };

    // Prepare event data for payment API
    const prepareEventsForPayment = (events: EventDetail[]): MindkraftEvent[] => {
        console.log("Original event data before transformation:", events);
        
        const transformedEvents = events.map(event => {
            // Calculate registration last date as one day before event start
            const startDate = new Date(event.start_time);
            const regLastDate = new Date(startDate);
            regLastDate.setDate(startDate.getDate() - 1);
            
            const transformedEvent = {
                EVENTTYPE: event.eventid,
                QUANTITY: 1,
                FEECODE: event.eventid,
                EVENTFROMDATE: formatDateForApi(event.start_time),
                EVENTTODATE: formatDateForApi(event.end_time),
                EVENTREGISTRATIONLASTDATE: formatDateForApi(regLastDate.toISOString())
            };
            
            console.log(`Transformed event ${event.eventid}:`, {
                original: {
                    eventid: event.eventid,
                    eventname: event.eventname,
                    start_time: event.start_time,
                    end_time: event.end_time,
                    price: event.price
                },
                transformed: transformedEvent
            });
            
            return transformedEvent;
        });
        
        console.log("All transformed events:", transformedEvents);
        return transformedEvents;
    };

    const handleProceedToPayment = async () => {
        try {
            setProcessingPayment(true);
            setError(null);
            
            // Log all available cookies for debugging
            console.log("All available cookies:", {
                accessToken: Cookies.get("accessToken"),
                registerNo: Cookies.get("registerNo"),
                fullName: Cookies.get("fullName"),
                mobileNo: Cookies.get("mobileNo"),
                userEmail: Cookies.get("userEmail"),
                intercollege: Cookies.get("intercollege"),
            });
            
            // Get user information from cookies
            const regNo = Cookies.get("registerNo") || "";
            const name = Cookies.get("fullName") || "User";
            const phone = Cookies.get("mobileNo") || "";
            const email = Cookies.get("userEmail") || "";
            const intercollege = Cookies.get("intercollege");
            
            console.log("User information retrieved from cookies:", {
                registrationNumber: regNo,
                studentName: name,
                studentMobile: phone,
                studentEmail: email,
                intercollegeFlag: intercollege,
            });
            
            if (!email || !name || !phone) {
                throw new Error("User information not found. Please log in again.");
            }

            console.log("Current cart items:", cartItems);
            console.log("Current cart total:", cartTotal);
            
            // Transform event data for the API
            const registeredEvents = prepareEventsForPayment(cartItems);
            
            // Prepare request body
            const requestBody: PaymentRequestBody = {
                RegistrationNumber: regNo,
                StudentName: name,
                StudentMobileNumber: phone,
                StudentEmail: email,
                RegisteredMindkraftEvents: registeredEvents
            };

            // Log the complete request body as it will be sent
            console.log("Payment API Request Body:", JSON.stringify(requestBody, null, 2));

            // Send API request to register events
            console.log("Sending request to:", 'https://eduapi.peopleserve.app/api/MindKraft/PostRegisteredMindKraftEventList');
            console.log("With headers:", {
                'Api-Token': 'T7%Fj3p#X8vR!mWq&5Zk@4N^dLb2cY$9Gh*o1A6P#KxMv3tZfQjR!7Xk8^YzL&',
                'Content-Type': 'application/json'
            });
            
            const response = await fetch('https://eduapi.peopleserve.app/api/MindKraft/PostRegisteredMindKraftEventList', {
                method: 'POST',
                headers: {
                    'Api-Token': 'T7%Fj3p#X8vR!mWq&5Zk@4N^dLb2cY$9Gh*o1A6P#KxMv3tZfQjR!7Xk8^YzL&',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log("API Response Status:", response.status);
            console.log("API Response Status Text:", response.statusText);
            
            const responseData = await response.json();
            console.log("API Response Data:", responseData);

            if (!response.ok) {
                throw new Error(responseData.message || "Failed to process payment registration");
            }

            const internalPaymentURL = "https://eduservetest.karunya.edu/online/PayAddOnFeesMindKraft.aspx";
            const externalPaymentURL = "https://eduservetest.karunya.edu/online/ExternalEventsMindKraft.aspx";

            // Redirect based on intercollege status
            if (intercollege === "false") {
                console.log("Redirecting to Internal Student Payment URL:", internalPaymentURL);
                window.location.href = internalPaymentURL;
            } else {
                console.log("Redirecting to External Student Payment URL:", externalPaymentURL);
                window.location.href = externalPaymentURL;
            }
            
        } catch (err) {
            console.error("Error processing payment:", err);
            setError((err as Error).message);
        } finally {
            setProcessingPayment(false);
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

                {/* Total Price and Proceed to Payment */}
                {cartItems.length > 0 && (
                    <div className="w-full text-center mt-6">
                        <p className="text-xl text-white font-semibold mb-4">
                            Total: {formatPrice(cartTotal)}
                        </p>
                        <button
                            className={`px-6 py-3 ${processingPayment ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition-colors`}
                            onClick={handleProceedToPayment}
                            disabled={processingPayment}
                        >
                            {processingPayment ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Proceed to Payment'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCartPage;