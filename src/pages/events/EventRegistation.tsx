import React from "react";

const EventRegistrationPage: React.FC = () => {
    const handleEventRegistration = (event: React.FormEvent) => {
        event.preventDefault();
        alert("Event registered successfully!");
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('/src/assets/register_bg.webp')" }}
        >
            {/* Header Section */}
            <div className="absolute top-10 w-full flex justify-center items-center">
                <img
                    src="/src/assets/karunyalogo.webp"
                    alt="Left Logo"
                    className="h-20 w-20 object-cover rounded-full absolute left-5"
                />
                <h1 className="text-2xl font-bold uppercase text-white">MINDKRAFT 2K25</h1>
            </div>

            {/* Form Container */}
            <div className="top-10 bottom-10 bg-white bg-opacity-10 m-10 rounded-lg p-4 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 backdrop-blur-md shadow-lg relative flex flex-col items-center text-center mt-20">
                {/* Logo Circle */}
                <div className="p-1 w-20 h-20 bg-opacity-60 bg-white rounded-full flex justify-center items-center absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-md">
                    <img
                        src="src/assets/mk_logo.webp"
                        alt="Logo"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>

                {/* Form Title */}
                <h1 className="text-2xl font-bold mt-8 text-white">Event Registration</h1>

                {/* Form */}
                <form className="w-full mt-6" onSubmit={handleEventRegistration}>
                    {/* Row 1: Event Name and Event Venue */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event Name</label>
                            <input
                                type="text"
                                placeholder="Enter event name"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event Venue</label>
                            <input
                                type="text"
                                placeholder="Enter event venue"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 2: Event Description */}
                    <div className="flex flex-col mb-4">
                        <label className="text-white font-bold mb-1">Event Description   (500 words)</label>
                        <textarea
                            placeholder="Enter event description"
                            required
                            className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            rows={4}
                        />
                    </div>

                    {/* Row 3: Event Start Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event Start Date</label>
                            <input
                                type="date"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event Start Time</label>
                            <input
                                type="time"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 4: Event End Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event End Date</label>
                            <input
                                type="date"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event End Time</label>
                            <input
                                type="time"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 5: Event Seats and Event Fees */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event Seats</label>
                            <input
                                type="number"
                                placeholder="Enter number of seats"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Event Fees</label>
                            <input
                                type="number"
                                placeholder="Enter event fees"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 6: Student Coordinator and Staff Coordinator */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Student Coordinator</label>
                            <input
                                type="text"
                                placeholder="Enter student coordinator name"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Staff Coordinator</label>
                            <input
                                type="text"
                                placeholder="Enter staff coordinator name"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 7: Prizes (1st, 2nd, 3rd) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">1st Place Prize</label>
                            <input
                                type="text"
                                placeholder="Enter 1st place prize"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">2nd Place Prize</label>
                            <input
                                type="text"
                                placeholder="Enter 2nd place prize"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">3rd Place Prize</label>
                            <input
                                type="text"
                                placeholder="Enter 3rd place prize"
                                required
                                className="w-full p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                    >
                        REGISTER THE EVENT
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventRegistrationPage;