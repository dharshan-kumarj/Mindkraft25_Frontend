import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";

import bgImage from "/assets/login_bg.webp";
import karunyalogo from "/assets/karunyalogo.webp";

interface Event {
    MKID: number;
    user_mkid: string;
    event: string;
    event_name: string;
    payment_status: boolean;
}

const MyEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    // const [setTotalAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    // const [, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("accessToken"))
                    ?.split("=")[1];

                if (!token) {
                    console.error("Access token not found. Redirecting to login...");
                    window.location.href = "/#/login"; // Redirect to login page
                    return;
                }

                console.log("Token Retrieved:", token);

                const response = await fetch("https://api.mindkraft.org/api/registered-events/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                console.log("API Response:", result);

                if (result && result.status === "success" && result.data) {
                    setEvents(result.data.registered_events || []);
                    // setTotalAmount(result.data.total_amount || 0);
                } else {
                    console.error("Unexpected response structure:", result);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start pt-16 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Navbar */}
            <a href="/#/">
                <nav className="absolute top-5 left-5 right-5 flex items-center justify-between p-4 bg-opacity-75 rounded-lg shadow-lg">
                    <img src={karunyalogo} alt="Karunya Logo" className="h-12 w-12 md:h-16 md:w-16 object-cover" />
                    <h1 className="text-white text-2xl font-bold">MINDKRAFT 2025</h1>
                    <div></div> 
                </nav>
            </a>

            {/* My Events Section */}
            <div className="bg-white bg-opacity-20 p-8 rounded-lg shadow-lg mt-20 w-full max-w-4xl">
                <h2 className="text-2xl text-white font-bold text-center mb-6">My Events(Free Events)</h2>

                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : events.length === 0 ? (
                    <div className="text-center text-gray-300">
                        <p>No events registered yet.</p>
                        <p>Register for an event to see it here.</p>
                    </div>
                ) : (
                    <>
                        {events.map((event, index) => (
                            <div
                                key={event.MKID || index}
                                className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-5 rounded-lg border border-gray-700 mb-4"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{event.event_name}</h3>
                                </div>
                                <div className="mt-3 md:mt-0 text-lg font-semibold text-white">
                                    {event.payment_status ? (
                                        <span className="text-green-400">✔ Registered</span>
                                    ) : (
                                        <span className="text-red-500">❌ Not Registered</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyEvents;
