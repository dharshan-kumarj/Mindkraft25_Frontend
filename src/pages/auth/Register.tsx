import React, { useState } from "react";
import axios from "axios";

import registerBg from "../../../public/assets/register_bg.webp"; // Import the background image
import karunyaLogo from "../../../public/assets/karunyalogo.webp"; // Import the Karunya logo
import mkLogo from "../../../public/assets/mk_logo.webp"; // Import the Mindkraft logo

const RegistrationPage: React.FC = () => {
    const [isInternal, setIsInternal] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(600); // 10 minutes in seconds

    const handleInternalRegistration = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const data = {
            email: formData.get("mail-id"),
            first_name: formData.get("first-name"),
            last_name: formData.get("last-name"),
            register_no: formData.get("register-number"),
            mobile_no: formData.get("phone-number"),
            date_of_birth: formData.get("dob"),
            password: formData.get("password"),
            is_faculty: false,
            intercollege: false,
            is_enrolled: true,
            student: {
                college_name: "Karunya University",
                branch: formData.get("program"),
                dept: formData.get("course"),
                year_of_study: parseInt(formData.get("year") as string),
                tshirt: false,
            },
        };

        try {
            const response = await axios.post(
                "https://api.mindkraft.org/user/register/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message) {
                setEmail(response.data.email);
                setShowOtpPopup(true);
                startTimer();
            } else {
                console.error("Error during registration:", response.data);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    const handleExternalRegistration = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const data = {
            email: formData.get("ext-mail-id"),
            first_name: formData.get("ext-first-name"),
            last_name: formData.get("ext-last-name"),
            mobile_no: formData.get("ext-phone-number"),
            password: formData.get("ext-password"),
            is_faculty: false,
            intercollege: true,
            is_enrolled: false,
            student: {
                college_name: formData.get("college-name"),
                branch: formData.get("ext-program"),
                dept: formData.get("ext-course"),
                year_of_study: parseInt(formData.get("ext-year") as string),
                tshirt: false,
            },
            register_no: "dummy", // Dummy value for register number
            date_of_birth: "2000-01-01", // Dummy value for date of birth
        };

        try {
            const response = await axios.post(
                "https://api.mindkraft.org/user/register/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message) {
                setEmail(response.data.email);
                setShowOtpPopup(true);
                startTimer();
            } else {
                console.error("Error during registration:", response.data);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        try {
            const response = await axios.post(
                "https://api.mindkraft.org/user/verify-otp/",
                { email, otp },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === "OTP verified successfully") {
                setShowOtpPopup(false);
                window.location.href = "/login";
            } else {
                console.error("Error during OTP verification:", response.data);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${registerBg}')` }} // Use the imported image
        >
            <style>
                {`
                select option {
                    color: black; /* Text color for dropdown options */
                }
                select:focus option:checked {
                    color: white; /* Text color for the selected option */
                }
                select {
                    color: white; /* Text color for the selected box */
                    background-color: transparent; /* Match the background */
                }
                select optgroup {
                    color: black; /* Text color for <optgroup> labels */
                    font-weight: bold; /* Make <optgroup> labels bold */
                }
                `}
            </style>

            {/* Header Section */}
            <div className="top-10 flex items-center justify-center relative">
                <img
                    src={karunyaLogo} // Use the imported image
                    alt="Left Logo"
                    className="h-20 w-20 object-cover rounded-full absolute left-5"
                />
                <div className="flex items-center gap-2">
                    <a href="/"><span className="text-2xl font-bold text-white">MINDKRAFT 2K25</span></a>
                    <img
                        src={mkLogo} // Use the imported image
                        alt="Logo Final"
                        className="h-10 w-10"
                    />
                </div>
            </div>

            {/* Container */}
            <div className="max-w-4xl mx-auto p-5 bg-white bg-opacity-10 rounded-lg backdrop-blur-md shadow-lg my-20">
                {/* Toggle Buttons */}
                <div className="flex justify-center gap-4 mb-9">
                    <button
                        className={`px-6 py-3 rounded-full font-bold ${isInternal
                            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                            : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setIsInternal(true)}
                    >
                        Internal Students
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-bold ${!isInternal
                            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                            : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setIsInternal(false)}
                    >
                        External Students
                    </button>
                </div>

                {/* Internal Registration Form */}
                {isInternal && (
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleInternalRegistration}>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">First Name</label>
                            <input
                                type="text"
                                name="first-name"
                                placeholder="Enter your first name"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Last Name</label>
                            <input
                                type="text"
                                name="last-name"
                                placeholder="Enter your last name"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Register Number</label>
                            <input
                                type="text"
                                name="register-number"
                                placeholder="Enter your register number"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone-number"
                                placeholder="Enter your phone number"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Mail ID</label>
                            <input
                                type="email"
                                name="mail-id"
                                placeholder="Enter your mail ID"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Program</label>
                            <select
                                name="program"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white"
                            >
                                <option value="">Select Program</option>
                                <option value="btech">B.Tech</option>
                                <option value="mtech">M.Tech</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Course</label>
                            <select
                                name="course"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white"
                            >
                                <option value="">Select Course</option>
                                <optgroup label="B.Tech">
                                    <option value="aerospace">B.Tech Aerospace Engineering</option>
                                    <option value="ai-data-science">B.Tech Artificial Intelligence and Data Science</option>
                                    <option value="biomedical">B.Tech Biomedical Engineering</option>
                                    <option value="biomedical-ai-ml">B.Tech Biomedical Engineering (Specialization in Artificial Intelligence and Machine Learning)</option>
                                    <option value="biomedical-data-science">B.Tech Biomedical Engineering (Specialization in Data Science)</option>
                                    <option value="biotechnology">B.Tech Biotechnology</option>
                                    <option value="biotech-drug-eng">B.Tech Biotechnology (Specialization in Drug Engineering)</option>
                                    <option value="biotech-genome-eng">B.Tech Biotechnology (Specialization in Genome Engineering and Technology)</option>
                                    <option value="biotech-precision-health">B.Tech Biotechnology (Specialization in Precision Health Technology)</option>
                                    <option value="civil">B.Tech Civil Engineering</option>
                                    <option value="computer-eng">B.Tech Computer Engineering</option>
                                    <option value="cse">B.Tech Computer Science and Engineering</option>
                                    <option value="cse-cyber-security">B.Tech Computer Science and Engineering (Specialization in Cyber Security)</option>
                                    <option value="cse-ai">B.Tech Computer Science and Engineering (Specialization in Artificial Intelligence)</option>
                                    <option value="cse-data-analytics">B.Tech Computer Science and Engineering (Specialization in Data Analytics)</option>
                                    <option value="cse-ai-ml">B.Tech Computer Science and Engineering (Specialization in Artificial Intelligence & Machine Learning)</option>
                                    <option value="ece">B.Tech Electronics and Communication Engineering</option>
                                    <option value="ece-ai">B.Tech Electronics and Communication Engineering (Specialization in Artificial Intelligence)</option>
                                    <option value="ece-iot">B.Tech Electronics and Communication Engineering (Specialization in IoT)</option>
                                    <option value="ece-computer">B.Tech Electronics and Computer Engineering</option>
                                    <option value="ece-computer-ai-ds">B.Tech Electronics and Computer Engineering (Specialization in Artificial Intelligence and Data Science)</option>
                                    <option value="ece-computer-ds">B.Tech Electronics and Computer Engineering (Specialization in Data Science)</option>
                                    <option value="food-processing">B.Tech Food Processing and Engineering</option>
                                    <option value="food-processing-iot">B.Tech Food Processing and Engineering (Specialization in IoT)</option>
                                    <option value="mechanical">B.Tech Mechanical Engineering</option>
                                    <option value="mechanical-3d-printing">B.Tech Mechanical Engineering (Specialization in 3D Printing)</option>
                                    <option value="mechanical-ev">B.Tech Mechanical Engineering (Specialization in Electric Vehicles)</option>
                                    <option value="robotics">B.Tech Robotics and Automation</option>
                                    <option value="robotics-ai">B.Tech Robotics and Automation (Specialization in Artificial Intelligence)</option>
                                </optgroup>
                                <optgroup label="B.A.">
                                    <option value="criminology">B.A. Criminology</option>
                                </optgroup>
                                <optgroup label="B.B.A.">
                                    <option value="bba">B.B.A.</option>
                                </optgroup>
                                <optgroup label="B.Com.">
                                    <option value="bcom">B.Com.</option>
                                    <option value="bcom-banking">B.Com. Banking and Capital Markets</option>
                                    <option value="bcom-fintech">B.Com. Financial Technologies</option>
                                </optgroup>
                                <optgroup label="B.Sc.">
                                    <option value="bsc-cs-ai">B.Sc. Computer Science (Specialization in Artificial Intelligence)</option>
                                    <option value="bsc-cs-ds">B.Sc. Computer Science (Specialization in Data Science and Analytics)</option>
                                    <option value="bsc-infosec">B.Sc. Information Security and Digital Forensics</option>
                                    <option value="bsc-forensic">B.Sc. Forensic Science</option>
                                    <option value="bsc-optometry">B.Sc. Optometry</option>
                                    <option value="bsc-visual-comm">B.Sc. Visual Communication (Specialization in Multimedia and Animation)</option>
                                </optgroup>
                                <optgroup label="M.Tech.">
                                    <option value="mtech-advanced-manu">M.Tech. Advanced Manufacturing Technology</option>
                                    <option value="mtech-aerospace">M.Tech. Aerospace Engineering</option>
                                    <option value="mtech-biomedical-instr">M.Tech. Biomedical Instrumentation</option>
                                    <option value="mtech-biotech">M.Tech. Biotechnology</option>
                                    <option value="mtech-comm-sys">M.Tech. Communication Systems</option>
                                    <option value="mtech-cse">M.Tech. Computer Science and Engineering</option>
                                    <option value="mtech-cse-ai-ds">M.Tech. Computer Science and Engineering (Specialization in Artificial Intelligence and Data Science)</option>
                                    <option value="mtech-cyber-security">M.Tech. Cyber Security</option>
                                    <option value="mtech-env-water">M.Tech. Environment and Water Resources Engineering</option>
                                    <option value="mtech-food-processing">M.Tech. Food Processing and Engineering</option>
                                    <option value="mtech-robotics">M.Tech. Robotics and Automation</option>
                                    <option value="mtech-structural">M.Tech. Structural Engineering</option>
                                    <option value="mtech-vlsi">M.Tech. VLSI Design</option>
                                </optgroup>
                                <optgroup label="M.B.A.">
                                    <option value="mba">M.B.A.</option>
                                </optgroup>
                                <optgroup label="M.Sc.">
                                    <option value="msc-agri-agronomy">M.Sc. Agriculture (Specialization in Agronomy)</option>
                                    <option value="msc-agri-plant-breeding">M.Sc. Agriculture (Specialization in Plant Breeding and Genetics)</option>
                                    <option value="msc-horticulture">M.Sc. Horticulture</option>
                                    <option value="msc-biotech">M.Sc. Biotechnology</option>
                                    <option value="msc-chemistry">M.Sc. Chemistry</option>
                                    <option value="msc-forensic">M.Sc. Forensic Science</option>
                                    <option value="msc-food-sci">M.Sc. Food Science and Technology</option>
                                    <option value="msc-physics">M.Sc. Physics</option>
                                </optgroup>
                                <optgroup label="Ph.D.">
                                    <option value="phd">Ph.D. (Engineering / Management / Sciences / Arts)</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Year</label>
                            <select
                                name="year"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white"
                            >
                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white font-bold mb-1">Confirm Password</label>
                            <input
                                                            type="password"
                                                            name="confirm-password"
                                                            placeholder="Confirm your password"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="col-span-2 p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                                                    >
                                                        SUBMIT
                                                    </button>
                                                </form>
                                            )}
                            
                                            {/* External Registration Form */}
                                            {!isInternal && (
                                                <form className="grid grid-cols-2 gap-4" onSubmit={handleExternalRegistration}>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">First Name</label>
                                                        <input
                                                            type="text"
                                                            name="ext-first-name"
                                                            placeholder="Enter your first name"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Last Name</label>
                                                        <input
                                                            type="text"
                                                            name="ext-last-name"
                                                            placeholder="Enter your last name"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            name="ext-phone-number"
                                                            placeholder="Enter your phone number"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Mail ID</label>
                                                        <input
                                                            type="email"
                                                            name="ext-mail-id"
                                                            placeholder="Enter your mail ID"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">College Name</label>
                                                        <input
                                                            type="text"
                                                            name="college-name"
                                                            placeholder="Enter your college name"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Program</label>
                                                        <select
                                                            name="ext-program"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white"
                                                        >
                                                            <option value="">Select Program</option>
                                                            <option value="btech">B.Tech</option>
                                                            <option value="mtech">M.Tech</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Course</label>
                                                        <input
                                                            type="text"
                                                            name="ext-course"
                                                            placeholder="Enter your course"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Year</label>
                                                        <select
                                                            name="ext-year"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white"
                                                        >
                                                            <option value="">Select Year</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Password</label>
                                                        <input
                                                            type="password"
                                                            name="ext-password"
                                                            placeholder="Enter your password"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-white font-bold mb-1">Confirm Password</label>
                                                        <input
                                                            type="password"
                                                            name="ext-confirm-password"
                                                            placeholder="Confirm your password"
                                                            required
                                                            className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="col-span-2 p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                                                    >
                                                        SUBMIT
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                            
                                        {/* OTP Popup */}
                                        {showOtpPopup && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-gray-800 p-6 rounded-lg text-center">
                                                    <h2 className="text-white text-2xl font-bold mb-4">Enter OTP</h2>
                                                    <input
                                                        type="text"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        placeholder="Enter 6-digit OTP"
                                                        maxLength={6}
                                                        className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 mb-4"
                                                    />
                                                    <button
                                                        onClick={handleVerifyOtp}
                                                        className="p-2 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                                                    >
                                                        Verify OTP
                                                    </button>
                                                    <p className="text-white mt-4">Time Remaining: {formatTime(timer)}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            };
                            
                            export default RegistrationPage;