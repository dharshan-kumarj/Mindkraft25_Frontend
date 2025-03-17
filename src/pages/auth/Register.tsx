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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [confirmPassword1, setConfirmPassword1] = useState<string>("");
  const [passwordError1, setPasswordError1] = useState<string>("");
  const [confirmPasswordError1, setConfirmPasswordError1] = useState<string>("");

  // Add error state for validation errors
  const [emailError, setEmailError] = useState<string>("");
  const [collegeNameError, setCollegeNameError] = useState<string>("");

  // Function to validate if email belongs to Karunya
  const isKarunyaEmail = (email: string) => {
    return email.toLowerCase().includes("@karunya.edu.in");
  };

  // Function to validate if college name is related to Karunya
  const isKarunyaCollege = (collegeName: string) => {
    const lowerCaseName = collegeName.toLowerCase();
    return (
      lowerCaseName.includes("karunya") ||
      lowerCaseName.includes("kits") ||
      lowerCaseName.includes("karunya institute") ||
      lowerCaseName.includes("karunya university")
    );
  };

  const handleInternalRegistration = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation
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
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleExternalRegistration = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset previous errors
    setEmailError("");
    setCollegeNameError("");

    const formData = new FormData(event.target as HTMLFormElement);
    const extEmail = formData.get("ext-mail-id") as string;
    const collegeName = formData.get("college-name") as string;

    // Validate if email belongs to Karunya
    if (isKarunyaEmail(extEmail)) {
      setEmailError(
        "This appears to be a Karunya email. Please use the Internal Students registration form."
      );
      return;
    }

    // Validate if college name is related to Karunya
    if (isKarunyaCollege(collegeName)) {
      setCollegeNameError(
        "Karunya University students should use the Internal Students registration form."
      );
      return;
    }

    setIsLoading(true); // Start loading animation

    const data = {
      email: extEmail,
      first_name: formData.get("ext-first-name"),
      last_name: formData.get("ext-last-name"),
      mobile_no: formData.get("ext-phone-number"),
      password: formData.get("ext-password"),
      is_faculty: false,
      intercollege: true,
      is_enrolled: false,
      student: {
        college_name: collegeName,
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
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    setMessage("");

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

      if (
        response.data.message === "OTP verified successfully" ||
        response.data.message === "Registration successful"
      ) {
        setMessage("OTP verified successfully. Redirecting to login page...");
        setTimeout(() => {
          setShowOtpPopup(false);
          window.location.href = "/#/login";
        }, 2000);
      } else {
        setMessage("Error during OTP verification. Please try again.");
        console.error("Error during OTP verification:", response.data);
      }
    } catch (error) {
      setMessage("Request failed. Please try again.");
      console.error("Request failed:", error);
    } finally {
      setIsLoading(false);
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
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length > 0 && newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long!");
    } else {
      setPasswordError("");
    }
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("ConfirPassword must be at least 8 characters long!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword1(newPassword);

    if (newPassword.length > 0 && newPassword.length < 8) {
      setPasswordError1("Password must be at least 8 characters long!");
    } else {
      setPasswordError1("");
    }
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange1 = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword1(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError1("ConfirPassword must be at least 8 characters long!");
    } else {
      setConfirmPasswordError1("");
    }
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
                .error-message {
                    color: #ff6b6b;
                    font-size: 0.875rem;
                    margin-top: 4px;
                    font-weight: 500;
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
          <a href="/">
            <span className="text-2xl font-bold text-white">
              MINDKRAFT'25
            </span>
          </a>
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
            className={`px-6 py-3 rounded-full font-bold ${
              isInternal
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setIsInternal(true)}
          >
            Internal Students
          </button>
          <button
            className={`px-6 py-2 rounded-full font-bold ${
              !isInternal
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
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={handleInternalRegistration}
          >
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
              <label className="text-white font-bold mb-1">
                Register Number
              </label>
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
                <option value="bschons">B.Sc(Hons)</option>
                <option value="bsc">B.Sc</option>
                <option value="bcom">B.Com</option>
                <option value="Ph.D">Ph.D</option>
                <option value="M.B.A">M.B.A</option>
                <option value="M.Sc"> M.Sc</option>

                
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
                <optgroup>
                  <option value="B.Tech Aerospace Engineering">
                    B.Tech Aerospace Engineering
                  </option>
                  <option value="B.Tech. Aerospace Engineering (Specialisation in Artificial Intelligence and Machine Learning)">
                    B.Tech. Aerospace Engineering (Specialisation in Artificial Intelligence and Machine Learning)
                  </option>
                  <option value="B.Tech. Aerospace Engineering (Specialisation in Unmanned Aerial Vehicles)">
                    B.Tech. Aerospace Engineering (Specialisation in Unmanned Aerial Vehicles) 
                  </option>
                  <option value=" B.Tech. Biomedical Engineering">
                    B.Tech. Biomedical Engineering
                  </option>
                  <option value="B.Tech. Biomedical Engineering (Specialisation in Artificial Intelligence and Machine Learning)">
                    B.Tech. Biomedical Engineering (Specialisation in Artificial Intelligence and Machine Learning)
                  </option>
                  <option value="B.Tech Biotechnology">B.Tech Biotechnology</option>
                  <option value="B.Tech Biotechnology (Specialization in Artificial Intelligence)">
                    B.Tech Biotechnology (Specialization in Artificial Intelligence)
                  </option>
                  <option value="B.Tech Biotechnology (Specialisation in Medical Biotechnology)">
                    B.Tech Biotechnology (Specialisation in Medical Biotechnology)
                  </option>B.Tech. Biotechnology (Specialisation in Genome Engineering and Technology) 
                  <option value="B.Tech. Biotechnology (Specialisation in Genome Engineering and Technology)">
                  B.Tech. Biotechnology (Specialisation in Genome Engineering and Technology)
                  </option>
                  <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
                  <option value="B.Tech. Electrical and Electronics Engineering">B.Tech. Electrical and Electronics Engineering</option>
                  <option value="B.Tech. Electrical and Electronics Engineering (Specialisation in Artificial Intelligence and Machine Learning)">
                  B.Tech. Electrical and Electronics Engineering (Specialisation in Artificial Intelligence and Machine Learning)
                  </option>
                  <option value=" B.Tech. Electronics and Communication Engineering">
                  B.Tech. Electronics and Communication Engineering
                  </option>
                  <option value="B.Tech. Electronics and Communication Engineering (Specialisation in Artificial Intelligence and Machine Learning)">
                  B.Tech. Electronics and Communication Engineering (Specialisation in Artificial Intelligence and Machine Learning) 
                  </option>
                  <option value="B.Tech. Food Processing and Engineering">
                  B.Tech. Food Processing and Engineering
                  </option>
                  <option value="B.Tech. Food Processing and Engineering (Specialisation in IoT)">
                  B.Tech. Food Processing and Engineering (Specialisation in IoT) 
                  </option>
                  <option value="B.Tech. Mechanical Engineering">
                  B.Tech. Mechanical Engineering
                  </option>
                  <option value="B.Tech. Mechanical Engineering (Specialisation in Artificial Intelligence and Machine Learning)">
                  B.Tech. Mechanical Engineering (Specialisation in Artificial Intelligence and Machine Learning)
                  </option>
                  <option value=" B.Tech. Robotics and Automation">
                  B.Tech. Robotics and Automation
                  </option>
                  <option value="B.Tech. Robotics and Automation (Specialisation in Artificial Intelligence and Data Science) ">
                  B.Tech. Robotics and Automation (Specialisation in Artificial Intelligence and Data Science) 
                  </option>
                  <option value="B.Tech. Robotics and Automation (Specialisation in Artificial Intelligence and Machine Learning)">
                  B.Tech. Robotics and Automation (Specialisation in Artificial Intelligence and Machine Learning)
                  </option>
                </optgroup>
                <optgroup label="School of Computer Science and Technology">
                  <option value="B.Tech. Computer Science and Engineering">B.Tech. Computer Science and Engineering</option>
                  <option value="B.Tech Computer Science & Engineering (Specialisation in Artificial Intelligence and Machine Learning) ">B.Tech Computer Science & Engineering (Specialisation in Artificial Intelligence and Machine Learning) </option>
                  <option value="B.Tech- Computer Science and Engineering (Specialisation in Cyber Security)">B.Tech- Computer Science and Engineering (Specialisation in Cyber Security)</option>
                  <option value="B.Tech. Computer Science and Engineering (Artificial Intelligence)">B.Tech. Computer Science and Engineering (Artificial Intelligence)</option>
                  <option value="B.Tech Computer Science & Engineering (Artificial Intelligence and Machine Learning)">B.Tech Computer Science & Engineering (Artificial Intelligence and Machine Learning)</option>
                  <option value="B.Tech. Artificial Intelligence and Data Science">B.Tech. Artificial Intelligence and Data Science</option>
                  <option value="B.Tech. Computer Engineering">B.Tech. Computer Engineering</option>
                  <option value="B.Tech. Computer Engineering (Specialisation in Cyber Security) ">B.Tech. Computer Engineering (Specialisation in Cyber Security) </option>

                </optgroup>
                <optgroup label="School of Agriculture">
                  <option value="B.Sc. (Hons.) Agriculture">B.Sc. (Hons.) Agriculture</option>
                </optgroup>
                <optgroup label="School of Science, Arts & Media">
                  <option value="B.Sc. Forensic Science">B.Sc. Forensic Science</option>
                  <option value="B.Sc. Information Security and Digital Forensics">
                  B.Sc. Information Security and Digital Forensics
                  </option>
                  <option value="B.Com. (Specialisation in Professional Accounting and Financial Technology)">
                  B.Com. (Specialisation in Professional Accounting and Financial Technology)
                  </option>
                  <option value="B.Sc. Computer Science and Media Production">
                  B.Sc. Computer Science and Media Production
                  </option>
                </optgroup>
                <optgroup label="School of Engineering & Technology">
                  <option value="M.Tech. Aerospace Engineering">
                  M.Tech. Aerospace Engineering
                  </option>
                  <option value="M.Tech. Biomedical Instrumentation">
                  M.Tech. Biomedical Instrumentation
                  </option>
                  <option value="M.Tech. Biotechnology">
                  M.Tech. Biotechnology
                  </option>
                  <option value="M.Tech. Computer Science and Engineering">M.Tech. Computer Science and Engineering</option>
                  <option value="M.Tech. Cyber Security">M.Tech. Cyber Security</option>
                  <option value="M.Tech. Food Processing and Engineering">
                  M.Tech. Food Processing and Engineering
                  </option>
                  <option value="M.Tech. Integrated Water Resources Management">
                  M.Tech. Integrated Water Resources Management
                  </option>
                  <option value="M.Tech. Robotics and Automation">
                  M.Tech. Robotics and Automation
                  </option>
                  <option value="M.Tech. Structural Engineering">
                  M.Tech. Structural Engineering
                  </option>
                  <option value="M.Tech. VLSI Design">
                  M.Tech. VLSI Design
                  </option>
                  <option value="M.Sc. Biotechnology">
                  M.Sc. Biotechnology
                  </option>
                  <option value="M.Sc. Food Science and Technology">
                  M.Sc. Food Science and Technology
                  </option>
                 
                </optgroup>
                <optgroup label="School of Agriculture">
                  <option value="M.Sc. (Agri.) in Genetics and Plant Breeding">
                  M.Sc. (Agri.) in Genetics and Plant Breeding
                  </option>
                  <option value="M.Sc. (Agri.) in Agronomy">
                  M.Sc. (Agri.) in Agronomy
                  </option>
                  <option value="M.Sc. (Hort.) in Fruit Science">
                  M.Sc. (Hort.) in Fruit Science
                  </option>

                </optgroup>
                <optgroup label="School of Science, Arts & Media">
                  <option value="M.Sc. Forensic Science">M.Sc. Forensic Science</option>
                  <option value="M.Sc. Information Security and Digital Forensics">M.Sc. Information Security and Digital Forensics</option>
                  <option value="M.Sc. Artificial Intelligence and Data Science">M.Sc. Artificial Intelligence and Data Science</option>
                </optgroup>

                <optgroup label="School of Management">
                  <option value="M.B.A.">
                  M.B.A.
                  </option>
                </optgroup>
                <optgroup label="Research">
                  <option value="Ph.D. Aerospace Engineering">
                  Ph.D. Aerospace Engineering
                  </option>
                  <option value="Ph.D. Mathematics">Ph.D. Mathematics</option>
                  <option value="Ph.D. Civil Engineering">Ph.D. Civil Engineering</option>
                  <option value="Ph.D. Computer Applications">Ph.D. Computer Applications</option>
                  <option value="Ph.D. Computer Science and Engineering">Ph.D. Computer Science and Engineering</option>
                  <option value="Ph.D. Criminology">Ph.D. Criminology</option>
                  <option value="Ph.D. Electrical and Electronics Engineering">
                  Ph.D. Electrical and Electronics Engineering
                  </option>
                  <option value="Ph.D. Electronics and Communications Engineering">Ph.D. Electronics and Communications Engineering</option>
                  <option value="Ph.D. Electronics and Instrumentation Engineering">
                  Ph.D. Electronics and Instrumentation Engineering
                  </option>
                  <option value="Ph.D. Mechanical Engineering">
                  Ph.D. Mechanical Engineering
                  </option>
                  <option value="Ph.D. Biotechnology">
                  Ph.D. Biotechnology
                  </option>
                  <option value="Ph.D. Chemistry">
                  Ph.D. Chemistry
                  </option>
                  <option value="Ph.D. Commerce">
                  Ph.D. Commerce
                  </option>
                  <option value="Ph.D. Food Processing and Engineering">
                  Ph.D. Food Processing and Engineering
                  </option>
                  <option value="Ph.D. Management Sciences">
                  Ph.D. Management Sciences
                  </option>
                  <option value="Ph.D. Nanoscience and Technology">
                  Ph.D. Nanoscience and Technology
                  </option>
                  <option value="Ph.D. Physics">
                  Ph.D. Physics
                  </option>
                  <option value="Ph.D. Library and Information Science">
                  Ph.D. Library and Information Science
                  </option>
                  

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
                <option value="5">5</option>
              </select>
            </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label className="text-white font-bold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <div className="text-red-500 text-sm mt-1">
                    {passwordError}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col">
                <label className="text-white font-bold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  required
                  className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && (
                  <div className="text-red-500 text-sm mt-1">
                    {confirmPasswordError}
                  </div>
                )}
              </div>
            

            <button
              type="submit"
              className="col-span-2 p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        )}

        {/* External Registration Form */}
        {!isInternal && (
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={handleExternalRegistration}
          >
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
                onChange={(e) => {
                  if (isKarunyaEmail(e.target.value)) {
                    setEmailError(
                      "This appears to be a Karunya email. Please use the Internal Students registration form."
                    );
                  } else {
                    setEmailError("");
                  }
                }}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold mb-1">College Name</label>
              <input
                type="text"
                name="college-name"
                placeholder="Enter your college name"
                required
                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                onChange={(e) => {
                  if (isKarunyaCollege(e.target.value)) {
                    setCollegeNameError(
                      "Karunya University students should use the Internal Students registration form."
                    );
                  } else {
                    setCollegeNameError("");
                  }
                }}
              />
              {collegeNameError && (
                <p className="error-message">{collegeNameError}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold mb-1">Program</label>
              <input
                type="text"
                name="ext-program"
                placeholder="Enter your Program(Eg:B.Tech)"
                required
                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
              />
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
                <option value="5">5</option>
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
                value={password1}
                onChange={handlePasswordChange1}
                />
                {passwordError1 && (
                    <div className="text-red-500 text-sm mt-1">
                      {passwordError1}
                    </div>
                  )}

            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="ext-confirm-password"
                placeholder="Confirm your password"
                required
                className="p-2 rounded bg-transparent border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70"
                value={confirmPassword1}
                onChange={handleConfirmPasswordChange1}
              />
               {confirmPasswordError1 && (
                  <div className="text-red-500 text-sm mt-1">
                    {confirmPasswordError1}
                  </div>
                )}
            </div>
            <button
              type="submit"
              className="col-span-2 p-3 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
              disabled={!!emailError || !!collegeNameError}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        )}

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
                disabled={isLoading}
              />
              <button
                onClick={handleVerifyOtp}
                className="p-2 bg-gradient-to-r from-blue-800 to-blue-400 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Verify OTP"
                )}
              </button>
              <p className="text-white mt-4">
                Time Remaining: {formatTime(timer)}
              </p>
              {message && <p className="text-white mt-4">{message}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;