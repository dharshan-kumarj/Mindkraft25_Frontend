import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// Define the types
interface Coordinator {
  name?: string;
  phone?: string;
  email?: string;
}

interface Event {
  eventid: string;
  eventname: string;
  description: string;
  type: string;
  category: number;
  category_name: string;
  division: string;
  start_time: string;
  end_time: string;
  price: string | number;
  participation_strength_setlimit: string | number;
  coordinators?: {
    student?: Coordinator;
    faculty?: Coordinator;
  };
}

// Import or define image paths
// Replace these paths with your actual image locations
const bgImage = "/assets/bg.png";
const menuIcon = "/assets/menu.png";
const cartIcon = "/assets/cart.png";

const MindkraftEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [eventDetailsLoading, setEventDetailsLoading] = useState(false);

  const navigate = useNavigate();

  // Cart status state
  const [cartStatus, setCartStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({
    loading: false,
    success: false,
    error: null,
  });

  // Initialize with sample data or fetch from API
  useEffect(() => {
    // Simulate API loading with setTimeout
    setTimeout(() => {
      // Sample data (you can replace this with an actual fetch call)
      const sampleData: Event[] = [
        {
            "eventid": "MK25E0080",
            "eventname": "Astronomy through Telescopes - Exhibition",
            "description": "Astronomical telescopes will be put on display during the Mindkraft event.",
            "type": "tech",
            "category": 1,
            "category_name": "Non - Technical",
            "division": "Physical Sciences",
            "start_time": "2025-03-21T09:00:00Z",
            "end_time": "2025-03-22T18:00:00Z",
            "price": "0",
            "participation_strength_setlimit": "School students",
            "coordinators": {
              "faculty": {
                "name": "Dr. D.Khanna - 1185",
                "phone": "9080776415",
                "email": "davidkhanna@karunya.edu"
            },
              "student": {
                "name": "Mr. Nitin Oliver P",
                "phone": "9894928737",
                "email": "nithinoliver23@karunya.edu.in"
              }
                }
            },
          {
            "eventid": "MK25E0011",
            "eventname": "CTF",
            "description": "Each team will be given clues from which they have to decode it and find the hidden flag in it using their skills.",
            "type": "tech",
            "category": 1,
            "category_name": "Technical",
            "division": "AIML",
            "start_time": "2025-03-21T09:00:00Z",
            "end_time": "2025-02-10T18:55:36Z",
            "price": "150",
            "participation_strength_setlimit": 90,
            "coordinators": {
              "faculty": {
                "name": "Angelin Jeba - 2767",
                "phone": "7094687611\nName: 1",
                "email": "angelinjeba@karunya.edu.in"
              },
              "student": {
                "name": "Johan Joseph",
                "phone": "8547666222\nName: 1",
                "email": "johanjoseph@karunya.edu.in"
              }
            }
          },
          {
            "eventid": "MK25E0078",
            "eventname": "Identify me",
            "description": "Candidates will explore their chemistry knowledge in finding objects.",
            "type": "tech",
            "category": 1,
            "category_name": "Technical",
            "division": "Physical Science",
            "start_time": "2025-03-21T09:00:00Z",
            "end_time": "2025-02-10T18:55:36Z",
            "price": "50",
            "participation_strength_setlimit": 200,
            "coordinators": {
              "faculty": {
                "name": "Dr. A. Obadiah - 1607",
                "phone": "9944286556\nName: 2",
                "email": "obadiah@karunya.edu"
              },
              "student": {
                "name": "MANISHA RANI KACHHAP",
                "phone": "7763999234",
                "email": "manisharani@karunya.edu.in"
              }
            }
          },
          {
                "eventid": "MK25E0079",
                "eventname": "Magik Show",
                "description": "Demonstrate and explain the phenomenon behind the curiosity of day to day simple chemical reaction from their root.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Physical Science (Chemistry)",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 250,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. A. Obadiah - 1607",
                        "phone": "9944286556\nName: 3",
                        "email": "obadiah@karunya.edu"
                    },
                    "student": {
                        "name": "Arunkumar S",
                        "phone": "8148501052",
                        "email": "arunchemistry1998@gmail.com"
                    }
                }
            },
            {
                "eventid": "MK25E0066",
                "eventname": "Technical Debate",
                "description": "A Technical Debate on Food Technology is a discussion forum where participant will express their view on challenges, and future trends in food processing, safety, sustainability, and nutrition.  ",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Food Processing Technology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 20,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Pathak Sumit Sudhir - 2389",
                        "phone": "9284829452\nName: 4",
                        "email": "pathaksumit@karunya.edu"
                    },
                    "student": {
                        "name": "Mr. Sudarshan Ramanathan and Mr. Larmeralds",
                        "phone": "9920204123 and 9677765186\n",
                        "email": "sudarshanramanathan@karunya.edu.in"
                    }
                }
            },
            // {
            //     "eventid": "MK25E0006",
            //     "eventname": "Gastronomer",
            //     "description": "\"Savor the thrill at Gastronomer, an eating competition\nwhere participants eat their way to victory! Join us for a\nfeast of competitive indulgence, as contenders showcase\ntheir appetites and determination in this ultimate\ngastronomic showdown.\"",
            //     "type": "tech",
            //     "category": 1,
            //     "category_name": "Non - Technical",
            //     "division": "Food Processing Technology",
            //     "start_time": "2025-03-21T09:00:00Z",
            //     "end_time": "2025-02-10T18:55:36Z",
            //     "price": "200",
            //     "participation_strength_setlimit": 100,
            //     "coordinators": {
            //         "faculty": {
            //             "name": "Dr. Wasiya Farzana (2379)",
            //             "phone": "               7999271860\n9840169360 and 8015222012\nName: 5",
            //             "email": "wasiya@karunya.edu"
            //         },
            //         "student": {
            //             "name": "Aishwariya K and Merryl Abigail",
            //             "phone": "               7999271860\n9840169360 and 8015222012\nName: 5",
            //             "email": "merrylabigail@karunyaa.edu.in"
            //         }
            //     }
            // },
            {
                "eventid": "MK25E0067",
                "eventname": "ChocoArtistry: Crafting Beauty in Cocoa",
                "description": "A Chocolate Art Challenge, ChocoArtistry is an unique competition invites talented artists, chocolatiers, and food enthusiasts to showcase their skills in transforming the rich, velvety texture of cocoa into stunning works of edible art. Join us to celebrate the participant's creativity, craftsmanship, and, of course, the irresistible allure of chocolate. ",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Food Processing Technology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. R. Freeda Blessie (2232)",
                        "phone": "9965576488\nName: 6",
                        "email": "freedablessier@karunya.edu"
                    },
                    "student": {
                        "name": "Leya B and Othniel Amos",
                        "phone": "8903775633 and 8883776554",
                        "email": "leyab23@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0068",
                "eventname": "Food Treasure Hunt",
                "description": "Food treasure hunt is a non-technical event where participants race to solve food-related riddles, complete hands-on challenges, and navigate through multiple stations, each testing their knowledge of food chemistry, safety, nutrition, and sustainability. At each station, teams will solve clues and tackle food-based puzzles to unlock the next location.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Food Processing Technology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Veena Paul (2686)",
                        "phone": "9170137878\nName: 7",
                        "email": "veenapaul@karunya.edu"
                    },
                    "student": {
                        "name": "Agila R and Siljo K Saji",
                        "phone": "6382080545 and 8590859758",
                        "email": "agilar@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0069",
                "eventname": "Food Hackathon",
                "description": "This Hackathon focuses on solving microbial challenges in food industries by developing novel techniques in non invasive detection and clean label processing.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Food Processing Technology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. T. V. Ranganathan (590)",
                        "phone": "9487846976\nName: 8",
                        "email": "ranganathan@karunya.edu "
                    },
                    "student": {
                        "name": "Malavika Manoj and Sidharath P",
                        "phone": "6282659002 and 9207419191",
                        "email": "malavikamanoj@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0070",
                "eventname": "Pictoquest",
                "description": "PictoQuest \u2013 Unraveling Enigma is a technical event that integrates logic-based picture puzzles with Food Processing Technology concepts. Participants solve puzzles to uncover answers, enhancing their critical thinking and problem-solving skills. This engaging challenge promotes strategic reasoning and pattern recognition, making learning both interactive and enjoyable.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Food Processing Technology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.Vijayalakshmi Kovuru-2390",
                        "phone": "9182228487\nName: 9",
                        "email": "vijayalakshmik@karunya.edu"
                    },
                    "student": {
                        "name": "Liwin Wilson Johns and Eabin Rosh M",
                        "phone": "7356835424 and 8086024210",
                        "email": "liwinwilson@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0071",
                "eventname": "Business Plan",
                "description": "The Business Plan Contest will provide students with the opportunity to showcase their business ideas.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Karunya School of Management",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100 Per Participants",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Nisha Malini    1934",
                        "phone": "9543377227\nName: 10",
                        "email": "nishag@karunya.edu"
                    },
                    "student": {
                        "name": "Mahima Thomas",
                        "phone": "7000294817",
                        "email": "mahimathomas24@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0012",
                "eventname": "FREE FIRE BATTLE GROUNDS GAMEZONE",
                "description": "\"This is a event on free fire battle grounds game \nHere there will be 12 teams minimum for each game and the players will be selected according to the points they get from the match and those who win the match will get the final prize money\"",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "AIML",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Ebenezer Jangam - 2676",
                        "phone": "70133 443654\nName: 11",
                        "email": "ebenezerj@karunya.edu"
                    },
                    "student": {
                        "name": "ELAHI MOHAMMAD NAWAZ",
                        "phone": "6301511124\nName: 11",
                        "email": "elahimohammad@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0072",
                "eventname": "Business Quiz",
                "description": "The Business Quiz will consist of questions related to various business aspects like marketing, finance, and management. ",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Karunya School of Management",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100 Per Participants",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Giri Babu - 2756",
                        "phone": "9493008410\nName: 12",
                        "email": "giribabu@karunya.edu"
                    },
                    "student": {
                        "name": "Abinesh T A",
                        "phone": "7598202813",
                        "email": "abinesht@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0073",
                "eventname": "Best Manager",
                "description": "The aim of this event is to identify the student with the traits of a good manager. It \nalso aims to find out how they demonstrate the skills, knowledge and talents of a \ngood manager. And further tests them on how they use the strategies to solve the \nproblems.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Karunya School of Management",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100 Per Participants",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Annie Priya Dharshini - 2325",
                        "phone": "8870777695\nName: 13",
                        "email": "anniepriya@karunya.edu"
                    },
                    "student": {
                        "name": "Hemamalini S.",
                        "phone": "916379137696",
                        "email": "hemamalinis@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0038",
                "eventname": " Capture the Flag (CTF)",
                "description": "A Capture the Flag (CTF) competition is a cybersecurity event where participants engage in hacking challenges designed to test their knowledge, skills, and problem-solving abilities in a technical environment. The primary goal is for participants to find specific pieces of text, known as \"flags\", that are hidden within intentionally vulnerable programs or websites. These flags are usually found by exploiting flaws or vulnerabilities within the system or application. The competition is often divided into categories such as reverse engineering, web security, cryptography, forensics, and binary exploitation. Participants or teams work through various challenges to capture these flags, earn points, and improve their ranking on the competition board.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150",
                "participation_strength_setlimit": 150,
                "coordinators": {
                    "faculty": {
                        "name": "Mr. D. Shibin - 1756",
                        "phone": "8072542091\nName: 14",
                        "email": "shibin@karunya.edu"
                    },
                    "student": {
                        "name": "Nitha",
                        "phone": "8921853641\nName: 14",
                        "email": "nithazachariah@karunya.edu.in "
                    }
                }
            },
            {
                "eventid": "MK25E0030",
                "eventname": "Harry potter vs voldemort duel",
                "description": "Event Concept: The event is a gamified quiz where participants battle a virtual \"Python Snake\" by answering progressively harder Python coding questions (MCQs, fill-in-the-blanks). Correct answers weaken the snake, while incorrect ones make it stronger. There are 10 rounds, with one question per round. The final goal is to defeat the snake by answering all questions correctly or deal the most \"damage\" to it",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 200,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. P. Eben Sophia - 2802",
                        "phone": "9789814239\nName: 15",
                        "email": "ebensophia@karunya.edu"
                    },
                    "student": {
                        "name": "Monick",
                        "phone": "9500950937\nName: 15",
                        "email": "monicks@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0031",
                "eventname": "Squid X",
                "description": "An electrifying fusion of technology, strategy, and survival!  Squid X brings the thrill of Squid Game into the tech world with six intense rounds of debugging, problem-solving, and IoT-based challenges. Participants must code, strategize, and outplay their opponents in a high-stakes battle where only the sharpest minds survive.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. S. Stewart Kirubakaran - 2331",
                        "phone": "9952556668\nName: 16",
                        "email": "stewart@karunya.edu"
                    },
                    "student": {
                        "name": "Ann Rivka (URK23CS8004)",
                        "phone": "9750021317\nName: 16",
                        "email": " annrivka@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0032",
                "eventname": "Tech Feud: Battle of the Brains",
                "description": "In Tech Feud, teams of participants will compete against each other in multiple rounds of questions based on various topics from computer science. Each round will consist of questions that require teams to guess the most popular answers, much like in Family Feud. Topics will cover a wide range of computer science domains, including algorithms, data structures, programming languages, web development, artificial intelligence, cybersecurity, and more. The event will be highly interactive, fast-paced, and fun, while also challenging participants' knowledge across the breadth of computer science. Teams will earn points by guessing the most popular answers to questions, with each round progressively more difficult and diverse in terms of topics.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Ms. Sneha George - 2542",
                        "phone": "9633596394\nName: 17",
                        "email": "snehageorge@karunya.edu"
                    },
                    "student": {
                        "name": "Esther (URK23CS1231)",
                        "phone": "9535908484\nName: 17",
                        "email": "jestinaesther@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0033",
                "eventname": "Build and Debug With IoT",
                "description": "The game is to make the people to debug the arduio code which is already provided and the code is in scrambled manner. Now the People need to debug the code and the obstacle avoiding robot components will be installed already and they need to connect them with jumper wires and upload the code and to make the car to run. ",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 70,
                "coordinators": {
                    "faculty": {
                        "name": "Ms. T.Kavitha - 2346",
                        "phone": "9444342405\nName: 18",
                        "email": "kavithat@karunya.edu"
                    },
                    "student": {
                        "name": "Sam Jenish (URK23CS1199)",
                        "phone": "9342755824\nName: 18",
                        "email": "samjenish@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0034",
                "eventname": "Compile or Die",
                "description": "This game blends the classic Mafia-style gameplay with the high-stakes world of coding, where teams of Developers must work together to protect their project from the nefarious Hackers. Special roles like the Debugger and Cyber Guardian add even more layers of strategy, keeping players on their toes as they attempt to outsmart and outcode each other.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "0",
                "participation_strength_setlimit": 150,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. P. Getzi Jeba Leelipushpam - 495",
                        "phone": "9566551171\nName: 19",
                        "email": "getzi@karunya.edu"
                    },
                    "student": {
                        "name": "M Durai Murugan",
                        "phone": "7092988091\nName: 19",
                        "email": "mduraimurugan@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0035",
                "eventname": "Building Worlds with Unity: AR/VR ",
                "description": "This workshop will introduce participants to Augmented Reality (AR) and Virtual Reality (VR) game development using the Unity Engine. It will combine a lecture-style discussion on the basics of Unity and its capabilities for AR/VR development with hands-on sessions where participants will create their own simple AR/VR games. The goal is to provide participants with the tools and knowledge to build immersive digital experiences using Unity. Participants will learn how to set up Unity for AR/VR development, interact with essential Unity features, and create functional prototypes or mini-games. By the end of the workshop, attendees will have a basic AR/VR game running on their system or device.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Seminar/ Workshop",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. C.P. Shirley - 2489",
                        "phone": "90038 20713\nName: 20",
                        "email": "shirleycp@karunya.edu"
                    },
                    "student": {
                        "name": "Jeremy Joe Thomas",
                        "phone": "7760981866\nName: 20",
                        "email": "jeremyjoe@karunya.edu.in"
                    }
                }
            },
            // {
            //     "eventid": "MK25E0022",
            //     "eventname": " Mafia: CSE edition",
            //     "description": "Cyber Mafia is an engaging, strategy-based role-playing game with a technical twist inspired by the classic game Mafia. In this version, participants take on roles such as Hackers (imposters), Developers (crew mates), Antivirus (protectors), and Network Monitors (investigators), all set in the thrilling backdrop of cybersecurity. The aim is to simulate real-world cybersecurity scenarios in an interactive way where:",
            //     "type": "tech",
            //     "category": 1,
            //     "category_name": "Technical",
            //     "division": "Computer Science and Engineering",
            //     "start_time": "2025-03-21T09:00:00Z",
            //     "end_time": "2025-02-10T18:55:36Z",
            //     "price": "100",
            //     "participation_strength_setlimit": 100,
            //     "coordinators": {
            //         "faculty": {
            //             "name": "Mrs. Keirolona Safana Seles - 2533",
            //             "phone": "9600528973\n9443391160\nName: 21",
            //             "email": "keirolonasafana@karunya.edu"
            //         },
            //         "student": {
            //             "name": "Mahima (URK23CS1168)",
            //             "phone": "9600528973\n9443391160\nName: 21",
            //             "email": "pearlinemahima@karunya.edu.in"
            //         }
            //     }
            // },
            {
                "eventid": "MK25E0036",
                "eventname": "ResuMe Up: Code Your Future",
                "description": "The Web Development Challenge will focus on introducing HTML and CSS, followed by a practical competition where participants build a portfolio website using these technologies. The event will conclude with a judging session based on the creativity, appearance, and use of HTML/CSS tags.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Seminar/ Workshop",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 120,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. I. Titus - 2343",
                        "phone": "8667504022\nName: 22",
                        "email": "titusi@karunya.edu"
                    },
                    "student": {
                        "name": "Benjamin",
                        "phone": "8310544039\nName: 22",
                        "email": "benjamingeorge22@karunya.edu.in"
                    }
                }
            },
            // {
            //     "eventid": "MK25E0024",
            //     "eventname": "E-Carnival",
            //     "description": "The E-Carnival is an immersive, tech-filled event that blends the excitement of virtual simulations, hands-on IoT experiences, and interactive games in a dynamic carnival setting. From high-speed multiplayer car simulations and cipher-based treasure hunts to remote-controlled obstacle courses and memory puzzles, each game challenges participants to think, strategize, and engage with technology in fun and innovative ways. Traditional carnival favorites like Spin the Wheel, Tic-Tac-Toe with sandbags, and a dart game get a digital or interactive twist, while activities like the bean bag toss race and photo booth add to the lively atmosphere. Whether testing precision, problem-solving, or agility, the E-Carnival offers something for everyone, making it a thrilling fusion of entertainment and technology.",
            //     "type": "tech",
            //     "category": 1,
            //     "category_name": "Non - Technical",
            //     "division": "Computer Science and Engineering",
            //     "start_time": "2025-03-21T09:00:00Z",
            //     "end_time": "2025-02-10T18:55:36Z",
            //     "price": "60",
            //     "participation_strength_setlimit": 300,
            //     "coordinators": {
            //         "faculty": {
            //             "name": "Ms. Pearly Princess - 2814",
            //             "phone": "8072363457\n9500463623\nName: 23",
            //             "email": "pearlyprincess@karunya.edu"
            //         },
            //         "student": {
            //             "name": "Sherine (URK22CS1011)",
            //             "phone": "8072363457\n9500463623\nName: 23",
            //             "email": "sherins@karunya.edu.in"
            //         }
            //     }
            // },
            {
                "eventid": "MK25E0037",
                "eventname": "E-Sports Showdown: The Ultimate Gaming Battle",
                "description": "This event will be an online gaming tournament that brings together gamers from various backgrounds to compete in popular video games. The tournament will feature multiple rounds, with players participating either individually or in teams, depending on the game format. The goal is to offer a competitive and fun environment, allowing gamers to showcase their skills in various online games, while also promoting community engagement and e-sports culture. The event will focus on creating a seamless experience for participants, including live streaming, real-time scores, and audience interaction. The games selected will be accessible to a wide audience, and the event will encourage both new and experienced players to join.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 200,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.A.Samson Arun Raj - 2304",
                        "phone": "9894505910\nName: 24",
                        "email": "samsonarunraj@karunya.edu"
                    },
                    "student": {
                        "name": "Ashwin",
                        "phone": "9489463035\nName: 24",
                        "email": "ashwinshinu@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0062",
                "eventname": "AD – MAD",
                "description": "Topics:\n1. Smart Tools and Gadgets\n2. Paints\n3. Energy Drinks.\nGroup of minimum 3 to maximum 5 can participate in the event.\nEach of the participants should register individually.\nOne picture of any product will be displayed related to the topic given.\nMusic and Properties can be brought by the participants.\nEnacting in a humorous way is more appreciable.\nLanguage: English only.\nTiming: 3 to 5 Minutes.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "English",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50 per participant",
                "participation_strength_setlimit": "75",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. N. Cinthia Jemima",
                        "phone": "9487846877",
                        "email": "cinthiajemiman@karunya.edu"
                    },
                    "student": {
                        "name": "Ms. Preha. C",
                        "phone": "8220171247",
                        "email": "prehac@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0019",
                "eventname": "EXQUIZITE",
                "description": "The quiz will have multiple rounds with a preliminary round open for\nall the participants. Top 4 teams will be selected for the final rounds.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Civil Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.E.Arunraj",
                        "phone": "9788683828\nName: 26",
                        "email": "arunraje@karunya.edu"
                    },
                    "student": {
                        "name": "Mr. Varun ",
                        "phone": "9612220355\nName: 26",
                        "email": "varunrajangom@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0020",
                "eventname": "Bob the Builder",
                "description": "Design and build a bridge using Ice cream stick (with lightweight, high loading capacity concept)",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Civil Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "250",
                "participation_strength_setlimit": "40 Teams (2 to 3 members per team)",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. K. Balamurali - 2761",
                        "phone": "8610287775\nName: 27",
                        "email": "balamurali@karunya.edu"
                    },
                    "student": {
                        "name": "1. MUDDARUSU BHANU PRASAD, 2. TIMOTHY, 3. MERVYN R K BOSE",
                        "phone": "9398527211, 8056802353, 8137050964\nName: 27",
                        "email": "muddarusubhanu@karunya.edu.in, mervynr@karunya.edu.in, timothyk@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0023",
                "eventname": "Squid game",
                "description": "Step into a high-stakes simulation designed to test your business acumen, decision-making, and teamwork through five intense challenges inspired by Squid Game. Each level reflects core managerial competencies, pushing candidates to their limits in strategy, patience, leadership, and risk assessment.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. A. Leo",
                        "phone": "8760853175\nName: 28",
                        "email": "leoa@karunya.edu"
                    },
                    "student": {
                        "name": "Malavika Suresh",
                        "phone": "6238322282\nName: 28",
                        "email": "malavikasuresh@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0024",
                "eventname": "Money Heist",
                "description": "Get ready for an adrenaline-fueled strategic quest where business meets intellect in a thrilling treasure hunt challenge! Inspired by the high-stakes precision of Money Heist, this game is designed to test your analytical thinking, risk management, teamwork, and strategic decision-making in a corporate-style setting.\nGame Structure: 5-Stage Business Intelligence Heist\nQuest 1-4: Decoding the Business Cipher\nQuest 5 -\ud83c\udfaf Key Business & Management Skills Tested:",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Shygil Joy  (2519)",
                        "phone": "9677466750\nName: 29",
                        "email": "shygiljoy@karunya.edu"
                    },
                    "student": {
                        "name": "Calix Dantalia",
                        "phone": "9677466750\n7574962324\nName: 29",
                        "email": "calizdantalia@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0025",
                "eventname": "Among Stocks",
                "description": "Step into the world of high-stakes trading, where intuition, analysis, and financial literacy are your greatest assets! Among Stock is a thrilling stock market simulation game designed to test your decision-making, risk assessment, and financial acumen in real-world trading scenarios.\n\ud83c\udfaf Game Concept: Spot the Market Imposter!",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "Rs.100",
                "participation_strength_setlimit": 80,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.V. Palanisingh (2094)",
                        "phone": "8940194307\nName: 30",
                        "email": "palanisingh@karunya.edu"
                    },
                    "student": {
                        "name": "Sharon John Thomas",
                        "phone": "6282864622\nName: 30",
                        "email": "sharonjohn22@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0026",
                "eventname": "Dapper Decades \u2013 Mr/Mrs. Business Tycoon",
                "description": "Power Attire Showcase \u2013 Candidates must present their best business attire, reflecting authority, professionalism, and confidence\u2014whether it's a classic CEO look, a modern entrepreneur style, or a futuristic executive ensemble.\n The Ramp Walk \u2013 A chance to own the stage, radiating charisma and leadership presence, just like a true business mogul.\nThe Business Question Challenge \u2013 Each candidate will answer a tricky business-related question that tests their strategic thinking, crisis management, financial intelligence, or leadership skills.\nJudging Criteria:\n\u2705 Business Attire & Presentation \u2013 How well the candidate embodies the essence of a successful business leader.\n\u2705 Confidence & Stage Presence \u2013 The ability to command attention and exude executive poise.\n\u2705 Intellectual Brilliance \u2013 The depth, clarity, and strategy behind their business answer.\nThe Title: The most well-dressed, confident, and business-savvy candidate will be crowned as Mr./Mrs. Business Tycoon and honored as the epitome of leadership and style.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. K. Lakshmi Priya (2322)",
                        "phone": "9789247707\nName: 31",
                        "email": "lakshmipriya@karunya.edu"
                    },
                    "student": {
                        "name": "Elsha Jasmine",
                        "phone": "8807990617\nName: 31",
                        "email": "elshajasmine@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0039",
                "eventname": "Cyber Hunt",
                "description": "The Cyber Hunt is an interactive cybersecurity challenge where QR codes containing CTF puzzles will be placed across the university. Participants must locate, scan, and solve these challenges, which test skills in cryptography and cybersecurity. The winner will be the first to solve the most challenges. This event aims to enhance problem-solving abilities and cybersecurity awareness in a fun and engaging way.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Ms. Bertia A - 2534",
                        "phone": "80562 82527\nName: 32",
                        "email": "bertia@karunya.edu"
                    },
                    "student": {
                        "name": "Bruno A",
                        "phone": "99448 71330\nName: 32",
                        "email": "brunoa@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0022",
                "eventname": "Iron Fist",
                "description": "Get ready for the ultimate test of strength, strategy, and endurance! In this intense showdown, competitors will go one-on-one in a battle of pure power, pushing their limits to claim the title of Champion of Champions!\nRound-by-round eliminations will determine the strongest contender, with each match demanding a mix of grit, technique, and unshakable determination. Only the boldest and most resilient will rise to the top!",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Prakash K. Elamana",
                        "phone": "9544367482\nName: 33",
                        "email": "prakashelamana@karunya.edu"
                    },
                    "student": {
                        "name": "Shashish A",
                        "phone": "6263071813\nName: 33",
                        "email": "shashisha@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0040",
                "eventname": "MODEL MASTERS",
                "description": "Model Masters is a technical event where registered participants will train machine learning models using a provided dataset. The challenge tests their skills in data preprocessing, model selection, and optimization to achieve the best results.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Darshika Kelin - 2681",
                        "phone": "9585928420\nName: 34",
                        "email": "darshika@karunya.edu"
                    },
                    "student": {
                        "name": "Renimol. S, Daya Susan George",
                        "phone": "6379251572, 8590327849\nName: 34",
                        "email": "renimols@karunya.edu.in, dayasusan@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0041",
                "eventname": "Last Man Standing",
                "description": "Last Man Standing is the ultimate Free Fire battle royale competition where only the strongest survive! Compete in intense solo or squad matches, fight through knockout rounds, and claim victory by being the last one standing. With epic prizes and fierce competition, it's time to prove your dominance on the battleground!",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "200 (per team)",
                "participation_strength_setlimit": "50 teams (200 members) ",
                "coordinators": {
                    "faculty": {
                        "name": "Nirmal Varghese Babu (2528)",
                        "phone": "9400288874\nName: 35",
                        "email": "nirmalvarghese@karunya.edu"
                    },
                    "student": {
                        "name": "Dhuruv Swamy, Jeffrey Chris",
                        "phone": "7418945601, 9497108722\nName: 35",
                        "email": "dhuruvswamy@karunya.edu.in, jeffreychris@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0042",
                "eventname": "Dare to survive",
                "description": "A high-stakes game of wit, skill, and endurance where players must survive a series of thrilling challenges. Each round pushes contestants to their limits, eliminating those who fail until only one remains victorious. Do you have what it takes to outlast and claim the ultimate prize.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. A. Jenefa  (2616)",
                        "phone": "99941 89181\nName: 36",
                        "email": "jenefaa@karunya.edu"
                    },
                    "student": {
                        "name": "RUMITHA S, RESHWIN R S",
                        "phone": "9025818517, 9384627367\nName: 36",
                        "email": "rumithas@karunya.edu.in, reshwinr@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0043",
                "eventname": "Cyber Chronicles",
                "description": "A crime has taken place, and the only clues left behind are hidden in the digital world! In Cyber Chronicles, you become a detective, searching for secrets buried in messages, images, and files. Follow the digital trail, connect the dots, and solve the case before time runs out.\n\nCan you crack the mystery and uncover the truth? The challenge begins now!",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Mr. Rahul R (2783)",
                        "phone": "77081 64465\nName: 37",
                        "email": "rahul@karunya.edu"
                    },
                    "student": {
                        "name": "Jerome T, Kaviya Varshini G S",
                        "phone": "\n90036 92101, 88078 36289\nName: 37",
                        "email": "jeromet22@karunya.edu.in, kaviyavarshini@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0045",
                "eventname": "Bot fest",
                "description": "A Bot Fest is typically an event where students showcase their skills in robotics, AI, and automation through projects, competitions, and interactive sessions.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Mrs. M. Bhuvaneshwari (2536)",
                        "phone": " 99940 70320\nName: 38",
                        "email": "bhuvaneshwari@karunya.edu"
                    },
                    "student": {
                        "name": "Chris Remegis",
                        "phone": " 79044 59520\nName: 38",
                        "email": "chrisremigius@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0021",
                "eventname": "Brushless painting",
                "description": "Brushless Painting is a fun and creative event where participants use unconventional tools like sponges, fingers, straws, combs, cotton, leaves, and even spray techniques to create stunning artwork. The goal is to break free from traditional methods and explore new ways to express creativity.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Civil Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 10,
                "coordinators": {
                    "faculty": {
                        "name": "Varun sabu sam,2894, Vinoth 2893",
                        "phone": "8943121337, 99943 95887\n 8056802353\nName: 39",
                        "email": "varunsabu@karunya.edu, vinoth@karunya.edu"
                    },
                    "student": {
                        "name": "Merwyn",
                        "phone": "8056802353\nName: 39",
                        "email": "mervynr@karunya.edu.in"
                    }
                }
            },
            // {
            //     "eventid": "MK25E0041",
            //     "eventname": "Crash or Cash",
            //     "description": "Two player per team will participate to excavate maximum load of sand from place to another place in a obstacle filled dark room. Player 1 who will be witness player 2 in the dark room though Mobile screen instructs about the course area. Player two inside the dark room with rc remotes controls the toy excavater to move sand from one place to the destination inside the room within limited 5 miniutes",
            //     "type": "tech",
            //     "category": 1,
            //     "category_name": "Non - Technical",
            //     "division": "Civil Engineering",
            //     "start_time": "2025-03-21T09:00:00Z",
            //     "end_time": "2025-02-10T18:55:36Z",
            //     "price": "100 per team",
            //     "participation_strength_setlimit": "150 Team",
            //     "coordinators": {
            //         "faculty": {
            //             "name": "Cyril Samuel JS (2828)",
            //             "phone": "93448 35708 \n  9497189017\nName: 40",
            //             "email": "cyrilsamuel@karunya.edu "
            //         },
            //         "student": {
            //             "name": "Mr.Milan",
            //             "phone": "93448 35708 \n  9497189017\nName: 40",
            //             "email": "cyrilsamuel@karunya.edu"
            //         }
            //     }
            // },
            {
                "eventid": "MK25E0074",
                "eventname": "RACE X",
                "description": "REMOTE CONTROL CAR SWILL BE PROVIDED TO TH EPARTICIPANTS FOR RACING ON A TRACK WITH OBSTACLES",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "MECHANICAL",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "250",
                "participation_strength_setlimit": 75,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. R RAJA - 192",
                        "phone": "7339524157\nName: 41",
                        "email": "raja_r11773@karunya.edu"
                    },
                    "student": {
                        "name": "GEORGE BOBBIN",
                        "phone": "8421445905\n",
                        "email": "georgebobin@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0013",
                "eventname": "TradeMAster Challenge: 24-Hour Profit Hunt",
                "description": "Think you can conquer the stock market in just 24 hours? Join the TradeMaster Challenge, a high-intensity virtual trading competition using the Frontpage paper trading app! Compete against fellow students to make the highest profit within a day. The top three traders will win exciting prizes. No real money, just skill and strategy\u2014analyze, trade, and rise to the top. Are you ready to prove you're the ultimate trader? Let the challenge begin!",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "AIML",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Srinitya G (2810)",
                        "phone": "8148170478\nName: 42",
                        "email": "srinitya@karunya.edu"
                    },
                    "student": {
                        "name": "Cyril Jacob",
                        "phone": "8874188732\nName: 42",
                        "email": "cyriljacob@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0077",
                "eventname": "TALENT SHOW'25",
                "description": "The students will be showcasing their talents (dancing, singing, mime, stand up comedy etc)",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "MEDIA",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "M JENNIFER JUNE - 1552",
                        "phone": "9003577802\nName: 43",
                        "email": "jenniferjune@karunya.edu"
                    },
                    "student": {
                        "name": "RAKSHITHA",
                        "phone": "8248344129",
                        "email": "rakshithas23@karunya.edu.in"
                    }
                }
            },
            // {
            //     "eventid": "MK25E0045",
            //     "eventname": "ROBO WAR",
            //     "description": "Participants have to bring their robot with weapon.They have to compete in Arena ",
            //     "type": "tech",
            //     "category": 1,
            //     "category_name": "Technical",
            //     "division": "Mechanical",
            //     "start_time": "2025-03-21T09:00:00Z",
            //     "end_time": "2025-02-10T18:55:36Z",
            //     "price": "300",
            //     "participation_strength_setlimit": 10,
            //     "coordinators": {
            //         "faculty": {
            //             "name": "Rajakumar S Rai",
            //             "phone": "9940985882\n8547410489\nName: 44",
            //             "email": "Rajakumars@karunya.edu"
            //         },
            //         "student": {
            //             "name": "Amalnath",
            //             "phone": "9940985882\n8547410489\nName: 44",
            //             "email": "amal@karunya.edu.in"
            //         }
            //     }
            // },
            {
                "eventid": "MK25E0075",
                "eventname": "Paper Presentation",
                "description": "Paper presentation",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "MECHANICAL",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150",
                "participation_strength_setlimit": 75,
                "coordinators": {
                    "faculty": {
                        "name": "Ebenezer Jacob Dhas",
                        "phone": "9940985882\nName: 45",
                        "email": "ebenezer@karunya.edu"
                    },
                    "student": {
                        "name": "Abhishek Nair",
                        "phone": "9497452916",
                        "email": "amal@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0027",
                "eventname": "Food without Fuel",
                "description": "Students will prepare food without using any of the fuel or energy",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.Shygil Joy (2519)",
                        "phone": "9677466750\nName: 46",
                        "email": "shygiljoy@karunya.edu"
                    },
                    "student": {
                        "name": "Alan John ",
                        "phone": "8104988821\nName: 46",
                        "email": "alanjohn@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0046",
                "eventname": "The Cipher Chase",
                "description": "This is will be a Capture the Flag event (CTF)\n- 1 hour time limit\n- 3 levels (easy, medium, hard) of challenges will be there with each level having 2 steganography and 2 cryptography challenges\n- by the end of 1 hour the team having the highest points will be declared the winner followed by runners up\n- Rs. 5 should be paid for a single hint (there will be total of 2 hints)\n",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Digital Sciences",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "75 participants expected",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. D. Ponmary Pushpa Latha (1882)",
                        "phone": "6374690501\nName: 47",
                        "email": "ponmarylatha@karunya.edu"
                    },
                    "student": {
                        "name": "Samuel Paul, Paul Samuel, Sam Moses",
                        "phone": "9121493710, 9177214700, 9344458459\nName: 47",
                        "email": "Samuelpaul23@karunya.edu.in, vipparthipaul@karunya.edu.in, sammoses@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0081",
                "eventname": "TrapZone",
                "description": "The Player enter a classroom that has been transformed into a  dark room.\nThe Outer Perimeter:  This first level acts as a gateway to the more challenging second level. Players must search the outer perimeter of the classroom for three flags. Two flags are hidden somewhere within the environment.  The third flag is earned, not found. Players must compete in a quick game of XOX (Tic-Tac-Toe) against a game master. The winner of the XOX game receives the third flag.\nOnce a player has successfully located the two hidden flags and won the XOX game to acquire the third flag, they have completed Level 1. Only then are they allowed to proceed to Level 2.  This ensures that players can't just rush through to the final level without demonstrating some skill and thoroughness.\nThe Inner layer: This is the final and more difficult level.  Players now enter the inner part of the classroom. Here, five more flags are hidden. These flags might be more cleverly concealed than the ones in Level 1.\nWinning the Game: The player who finds all eight flags (three from Level 1 and five from Level 2) in the fastest time wins the game.  A timer is likely used to track each player's\u00a0progress.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Robotics Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "Rs. 100",
                "participation_strength_setlimit": 200,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Bini D - 2405 ",
                        "phone": "9042226212\nName: 48",
                        "email": "bini@karunya.edu"
                    },
                    "student": {
                        "name": "Ashwin P A",
                        "phone": "8089335562",
                        "email": "aswinp22@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0014",
                "eventname": "Tech- wizz",
                "description": "Poster presentation on Recent advancement in biomedical field",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biomedical Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.Gnanasaravanan (2508)",
                        "phone": "9677975450\nName: 49",
                        "email": "gnanasaravanan@karunya.edu"
                    },
                    "student": {
                        "name": "Letitia Nimshi",
                        "phone": "9717640474\nName: 49",
                        "email": "letitianimshi@karunya@edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0015",
                "eventname": "Bio-Mystery Escape Room",
                "description": "Step into the darkness, where three dolls hide a deadly secret\u2014one is infected with a virus. Scattered blood samples and cryptic clues await, but only the sharpest minds will decipher them. Hunt, analyze, and uncover the truth before time runs out. the team who find with short time wins.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biomedical Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Prasanna J (2818)",
                        "phone": "9597972847\nName: 50",
                        "email": "prasannaj@karunya.edu"
                    },
                    "student": {
                        "name": "Vaibhav Kiran",
                        "phone": "7736605542\nName: 50",
                        "email": "vaibhavkiran@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0016",
                "eventname": "Memory Relay",
                "description": "The medical equipment names will be displayed; the one participant will memorize the names with the allotted time, other have to find them based on the clue.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biomedical Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. D.Hepsiba",
                        "phone": "8870452121\nName: 51",
                        "email": "hepsiba@karunya.edu"
                    },
                    "student": {
                        "name": "Dharshan R",
                        "phone": "9790683634\nName: 51",
                        "email": "dharshanr22@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0017",
                "eventname": "Ink it, Guess it",
                "description": "One participant will be given the picture; the others will recreate it based on the instructions.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Biomedical Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "0",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Ashisha",
                        "phone": "7092164647\nName: 52",
                        "email": "ashisha@karunya.edu"
                    },
                    "student": {
                        "name": "Arpit Chauhan",
                        "phone": "7217241345\nName: 52",
                        "email": "arpitchauhan@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0018",
                "eventname": "Workshop on Biomedical Instrumentation",
                "description": "Workshop on Biomedical Instrumentation",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biomedical Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Subha Hency Jose",
                        "phone": "9487846907\nName: 53",
                        "email": "hency20002000@karunya.edu"
                    },
                    "student": {
                        "name": "Venika G",
                        "phone": "6379334208\nName: 53",
                        "email": "venikag@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0082",
                "eventname": "Dashout",
                "description": "Dashout is a definitive stage where the roar of metal, the buzz of innovation, and the excitement of contest unite. It's not only a fight; its a display where uniqueness of design engineering skills  in developing their independent warriors to take part in bot fight",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Robotics Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "Rs. 100",
                "participation_strength_setlimit": 40,
                "coordinators": {
                    "faculty": {
                        "name": "Dr Jegathesan V",
                        "phone": "9092551032\nName: 54",
                        "email": "jegathesan@karunya.edu"
                    },
                    "student": {
                        "name": "Adithya ",
                        "phone": "9445739750",
                        "email": "adithyas@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0051",
                "eventname": "OG DETECTIVE",
                "description": "Step into the shoes of a forensic expert! Analyze evidence, decode clues, and unravel the mystery in this thrilling crime scene investigation challenge.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Division of Criminology and Forensic Science",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Ms. Labhini Rahangdale -2598",
                        "phone": "7066339242\nName: 55",
                        "email": "labhini@karunya.edu "
                    },
                    "student": {
                        "name": "Aleen Godwin",
                        "phone": "9500771887\nName: 55",
                        "email": "aleengodina92@gmail.com"
                    }
                }
            },
        
            {
                "eventid": "MK25E0083",
                "eventname": "Maze Master",
                "description": "The Circuit Treasure Hunt isn't just about finding hidden objects; it's about combining your wits, technical knowledge, and teamwork to unearth the components of a complete circuit. Scattered across the college grounds, vital circuit elements await discovery.  Participants will follow a trail of cryptic clues, each successful find leading them closer to the next piece of the puzzle.  With every component retrieved, a new riddle unlocks the location of the next treasure.\nThe ultimate prize? A circuit diagram that will bring all the discovered pieces together.  Once all the components are in hand, teams will race against the clock to assemble the circuit according to the provided schematic.  The first team to correctly connect the components and achieve the desired output will claim the title of Circuit Treasure Hunt champions! Get ready to decode clues, explore hidden corners, and put your electronics skills to the test in this unique and\u00a0engaging\u00a0event.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Robotics Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "Rs. 100",
                "participation_strength_setlimit": 75,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Anitha Angeline - 2523",
                        "phone": "94420 69380\nName: 57",
                        "email": "anithaangeline@karunya.edu"
                    },
                    "student": {
                        "name": "CHILUKURI THANMAI SRI MURALI",
                        "phone": "+91 94420 69380\n+91 90146 07873\n",
                        "email": "chilukurithanmai@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0052",
                "eventname": "Lights Camera Investigation\u00a0!",
                "description": " Themes: Participants will be given 4 forensic-related themes.  \n- Format: Teams must create a 3-minute Instagram reel based on one of the themes. \nTeam members : 4",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Division of Criminology and Forensic Science",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50 per person ",
                "participation_strength_setlimit": "80 Participants (20 Teams)",
                "coordinators": {
                    "faculty": {
                        "name": "Ms. Marvel Bhosle - 2494",
                        "phone": "9511981087\nName: 58",
                        "email": "marvelbhosle@karunya.edu"
                    },
                    "student": {
                        "name": "Sridhar ",
                        "phone": "7708323663\nName: 58",
                        "email": "bemotivated36@gmail.com"
                    }
                }
            },
            {
                "eventid": "MK25E0053",
                "eventname": "TATA - DOCOMO",
                "description": "TATA - DOCOMO\n\nA new day a new crime,Tata Docomo begins by giving an overview of an case with suspects along with the 1st clue. After tackling unlock other clues by performing a task.Keep on eliminating suspects and by the end of 8th clue the culprit\u00a0is\u00a0cornered..",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Division of Criminology and Forensic Science",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 80,
                "coordinators": {
                    "faculty": {
                        "name": "Ms. Poonam Moon - 2597, Dr. Shifa Shine - 2788",
                        "phone": "9373439852, 8304877881\nName: 59",
                        "email": "shifashine@karunya.edu"
                    },
                    "student": {
                        "name": "ABINAYAA.B",
                        "phone": "7418466931\nName: 59",
                        "email": "babinayaa@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0061",
                "eventname": " Kidz cracker ",
                "description": "Cracking : The Moto of the first round is to crack the given md5 or sha hash value driven from the given puzzle and identifying the password.\n\nDebugging: The second round is to debug the given code and making it run and generate the output .\n\nIdeathon: The final round is to giving the participants a chance to flow their creativity and giving ideas for the problems given.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Digital Sciences",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150 per participant ",
                "participation_strength_setlimit": "25 teams with 2 participants max  and 20 solo Participants",
                "coordinators": {
                    "faculty": {
                        "name": "Dr.S.Sanjith 2605",
                        "phone": "9751995269\nName: 60",
                        "email": "Sanjith@karunya.edu"
                    },
                    "student": {
                        "name": "Brightina S,  Avinaash Isaac  ",
                        "phone": "9043054504 and 9944604672\nName: 60",
                        "email": "brightinas24@karunya.edu.in,  avinaashisaac24@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0076",
                "eventname": "CAD Modelling competition",
                "description": "The participants will be given a CAD model details.They have to model it in CREO software",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "MECHANICAL",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150",
                "participation_strength_setlimit": 45,
                "coordinators": {
                    "faculty": {
                        "name": "Rajakumar S Rai",
                        "phone": " 9940985882\nName: 61",
                        "email": "rajakumars@karunya.edu "
                    },
                    "student": {
                        "name": "George Bobbin",
                        "phone": "8421445905\n",
                        "email": "georgebobin@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0044",
                "eventname": "KARUNYA'S IPL AUCTION",
                "description": "IPL Mock Auction\nOverview:\nAn engaging event testing cricket knowledge and strategic team-building through a\nsimulated IPL auction\n\nEvent Details:\n- Purse: INR 100 Crore\n- Team Size:16-18 players (6-8 overseas)\n- Rounds: 2\n- Scoring:\n- Team Points: Based on squad strength.\n - Bonus Points: Based on remaining purse.\n\nEvent Model:\nRound 1: Cricket Quiz\n- 50 questions, 25 minutes.\n- Top 10 teams advance.\n\nRound 2: Bidding War\n- Teams assigned an IPL franchise.\n- INR 120 Crore budget for auction.\n- Balanced squad building is key.\n\nScoring:\n- Team Points: Squad composition, player quality.\n- Bonus Points: Effective budget management.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Data Science and Cyber Security",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150 per person",
                "participation_strength_setlimit": 80,
                "coordinators": {
                    "faculty": {
                        "name": "Mrs. Antony Taurshia, 2348",
                        "phone": "9384218969\nName: 62",
                        "email": "antonytaurshia@karunya.edu"
                    },
                    "student": {
                        "name": "SANJAY NESAN J",
                        "phone": "9944064709\n",
                        "email": "sanjaynesan@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0047",
                "eventname": "TUF BROTHERS",
                "description": "Encouraging the youth generation to involve in fitness activities to keep their body healthy as wealth.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Digital Sciences",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.S.Sanjith 2605",
                        "phone": "9751995269\nName: 63",
                        "email": "Sanjith@karunya.edu"
                    },
                    "student": {
                        "name": "Aravindhan M, Praveen Kumar M ",
                        "phone": "8870461970, 9342203904\nName: 63",
                        "email": "aravindhanm24@karunya.edu.in praveenkumarm24@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0048",
                "eventname": " Treasure Hunt",
                "description": "Team must stay together during the treasure hunt and are encouraged to work together to solve the clues. It includes 2 Rounds and 3 members per team.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Digital Sciences",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": " Dr.Linda Rose (2678)",
                        "phone": "7708664484\nName: 64",
                        "email": "lindarose@karunya.edu"
                    },
                    "student": {
                        "name": "J.Saranyan, Laurren Prem Louis Premkumar",
                        "phone": "7695996904\nName: 64",
                        "email": "saranyanj@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0049",
                "eventname": "Round Table ",
                "description": "The game consists of series of tasks that teams must complete while rotating through different stations.\nIt includes 5 Rounds and 2 members per team.",
                "type": "tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Digital Sciences",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "60",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.P.Esther Jebarani (2875)",
                        "phone": "9894774756\nName: 65",
                        "email": "esther@karunya.edu"
                    },
                    "student": {
                        "name": "J.Saranyan, S.Jane Samlin, B.Smirithi",
                        "phone": "7695996904, 7305982779\nName: 65",
                        "email": "janesamlin@karunya.edu.in,janesamlin@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0003",
                "eventname": "AeroDrop: Water Rocketry & Parachute Challenge",
                "description": "AeroDrop is a thrilling two-stage water rocketry and parachute deployment competition that challenges participants to design, build, and launch a water rocket with a functional parachute recovery system.\n",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100\u20b9",
                "participation_strength_setlimit": 60,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.S.Venkatachalam - 2137",
                        "phone": "              97911 75905\n94874 63124 & 95667 52757\nName: 66",
                        "email": "venkatachalam@karunya.edu"
                    },
                    "student": {
                        "name": "Jasmine  & Afreen A",
                        "phone": "              97911 75905\n94874 63124 & 95667 52757\nName: 66",
                        "email": "\"jasminesabeeka@karunya.edu.in &  afreena@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0004",
                "eventname": "EcoAero: Sustainable Aero-Modelling Challenget",
                "description": "EcoAero is a unique aeromodelling competition that challenges participants to design and build functional model aircraft using only waste or recycled materials. \n",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150\u20b9",
                "participation_strength_setlimit": 70,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.Aldin Justin - 1280",
                        "phone": " 9047653317\n86102 16697\nName: 67",
                        "email": "aldinjustin@karunya.edu "
                    },
                    "student": {
                        "name": "Jerline Mercy\t",
                        "phone": " 86102 16697\nName: 67",
                        "email": "jerlinemercy@karunya.edu.in\t"
                    }
                }
            },
            
            {
                "eventid": "MK25E0063",
                "eventname": "Feel the Play",
                "description": "A picture will be displayed on the screen, and the participant can play any music (without lyrics) relevant to that picture.\nMusic instruments can be anything of the participant’s choice.\nIndividual participation only.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "English",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50 per participant",
                "participation_strength_setlimit": "75",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. N. Cinthia Jemima",
                        "phone": "9487846877",
                        "email": "cinthiajemiman@karunya.edu"
                    },
                    "student": {
                        "name": "Janet Olivia Richmond",
                        "phone": "9894640622",
                        "email": "janetolivia@karunya.edu.in"
                    }
                }
            },{
                "eventid": "MK25E0064",
                "eventname": "Story the Pictures",
                "description": "There will be 5-7 pictures in one slide. Each participant can write up their own imagination in 200 to 300 words.\n20 minutes duration will be provided, and the picture will be displayed only for the first 5 minutes.\nIndividual participation only.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "English",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50 per participant",
                "participation_strength_setlimit": "75",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. N. Cinthia Jemima",
                        "phone": "9487846877",
                        "email": "cinthiajemiman@karunya.edu"
                    },
                    "student": {
                        "name": "Daniel Jebarajan. T",
                        "phone": "8072424136",
                        "email": "danieljeba@karunya.edu.in"
                    }
                }
            },{
                "eventid": "MK25E0065",
                "eventname": "Poetry Writing",
                "description": "Topics:\n1. Loved ones\n2. Chat GPT\n3. Mythology\n4. Desserts\n5. Picnic\nIndividual participation only.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "English",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50 per participant",
                "participation_strength_setlimit": "75",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. N. Cinthia Jemima",
                        "phone": "9487846877",
                        "email": "cinthiajemiman@karunya.edu"
                    },
                    "student": {
                        "name": "Shona Shapriya. B",
                        "phone": "8270524369",
                        "email": "shonashapriya@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0055",
                "eventname": "ELECTROHACK",
                "description": "The objective of this event is to test participants circuit analysis, troubleshooting and design skills while fostering innovation and real-world problem solving. Through multiple rounds, participants will identify and correct errors, creatively build functional circuits, and analyze complex systems. Additionally, they will design and develop innovative electronic projects within a given theme and time limit, blending hands-on circuit expertise with a hackathon- style invention challenge. This competition aims to enhance problem solving abilities, practical electronics knowledge, and creative design thinking.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "ECE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "100",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. J. Anitha",
                        "phone": "9486078177",
                        "email": "anithaj@karunya.edu"
                    },
                    "student": {
                        "name": "Angel Mariya",
                        "phone": "8281191957\nName: 67",
                        "email": "alanjohn@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0056",
                "eventname": "CIRCUITRONIX",
                "description": "The objective of this event is to test participants circuit analysis, troubleshooting and design skills while fostering innovation and real-world problem solving. Through multiple rounds, participants will identify and correct errors, creatively build functional circuits, and analyze complex systems. Additionally, they will design and develop innovative electronic projects within a given theme and time limit, blending hands-on circuit expertise with a hackathon- style invention challenge. This competition aims to enhance problem solving abilities, practical electronics knowledge, and creative design thinking.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "ECE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "100",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. M. A. P. Manimegalai",
                        "phone": "9486927137",
                        "email": "manimekalai@karunya.edu"
                    },
                    "student": {
                        "name": "Jelish G",
                        "phone": "93425 82913\nName: 67",
                        "email": " jelishg@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0057",
                "eventname": "Hack And Seek: Debug, Code, Innovate!",
                "description": "This event is designed to push participants beyond theoretical knowledge by testing their coding, debugging, and problem-solving skills. It merges elements of general aptitude, error debugging, and a treasure hunt challenge, ensuring a dynamic and competitive experience. ",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "ECE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "100",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Roopa Jeyasingh",
                        "phone": "9994302920",
                        "email": "roopa@karunya.edu"
                    },
                    "student": {
                        "name": "Akul sakthii G \t",
                        "phone": "9585591689\nName: 67",
                        "email": "akulsakthii@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0058",
                "eventname": "Explosive Circuitry",
                "description": "It is a team-based escape room style event where participants must solve a series of circuit-based, encryption, and logical puzzles to diffuse the bomb.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "EEE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": "70",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. F. T. Josh",
                        "phone": "9443474227",
                        "email": "josh@karunya.edu "
                    },
                    "student": {
                        "name": "Sam Abraham Mathew, Astro Robert R.A., Justin George,  Samuel V\t",
                        "phone": "9585591689\nName: 67",
                        "email": "samabraham23@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0059",
                "eventname": "Eat, Shoot, Score! - Conquer the Challenge!",
                "description": "Race against time where speed, accuracy, and excitement collide! Participants must take on three thrilling challenges: 1. Eat – Gobble up a set number of Pani pri as fast as possible.2. Shoot – Take aim and knock down the cup pyramid with precision.3. Score – Test your cricket skills by hitting the target.The fastest to complete all three challenges wins the ultimate bragging rights!",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "EEE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "75",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. F. T. Josh",
                        "phone": "9443474227",
                        "email": "josh@karunya.edu"
                    },
                    "student": {
                        "name": "Akshitha Anurag, Sharath M, Rino T Reji, Sam Vaiphei\t",
                        "phone": "9080057144\nName: 67",
                        "email": "akshithaanurag@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0060",
                "eventname": "Shooting Stars – The Ultimate Penalty Challenge",
                "description": "Think you have the perfect shot? Shoo􀆟ng Stars is a thrilling football challenge designed to test accuracy, control, and composure. Par􀆟cipants will take five consecu􀆟ve shots, each with increasing difficulty. To win, they must successfully complete all five shots. This one-shot-per-player game leaves no room for errors—miss a shot, and you’re eliminated! Can you master all five challenges and claim the 􀆟tle of Shoo􀆟ng Star? Step up, take your best shot, and prove your skills!  Shot breakdown-  Free Shot – A straigh􀆞orward shot with no obstacles or goalkeeper.  Obstacle Challenge 1 – Single obstacle placed 1.5 meter from the goal.  Obstacle Challenge 2 – Double obstacles placed 1 meter from the goal. Close-Range Free Shot – The shooter can move closer to the goal, but a goalkeeper will be present.  Final Penalty Shot – A standard penalty kick with the goalkeeper defending.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "EEE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": "60",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. V. Evelyn Brindha",
                        "phone": "9790601852",
                        "email": "evelynbrindha@karunya.edu "
                    },
                    "student": {
                        "name": "Harish P, Joel Abishek\t",
                        "phone": "9789449022\nName: 67",
                        "email": "harishp24@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0091",
                "eventname": "Ultimate Escape Room Challenge",
                "description": " A Tech Puzzle Challenge is an interactive, team-based technical escape game where participants must solve a series of logical, technical, and analytical puzzles to escape successfully. This event is designed to test participants' problem-solving abilities, critical thinking, and teamwork in an engaging escape-room-style format. The puzzles incorporate circuit debugging, Morse code decryption, cryptography, and logical reasoning, making it both a fun and intellectually stimulating challenge. Teams will progress through multiple stages, where each solved puzzle unlocks the next challenge. The first team to complete all the puzzles and enter the final escape code will be declared the winner.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "EEE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": "75",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. F. T. Josh",
                        "phone": "9443474227",
                        "email": "josh@karunya.edu"
                    },
                    "student": {
                        "name": "STIBIN STEEPHEN, GIFTO JEESON, KETHAVATH GAUTHAM NAIK, BHUVANKUMAR V\t",
                        "phone": "8485903862\nName: 67",
                        "email": "stibinsteephen@karunya.edu.in\t"
                    }
                }
            },{
                "eventid": "MK25E0028",
                "eventname": "Synergy Showdown",
                "description": "A non-technical event organized by the Commerce and International Trade department, bringing together participants to showcase their strategic and teamwork skills in various challenges.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": "60",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. A. Leo",
                        "phone": "8760853175",
                        "email": "leoa@karunya.edu.in"
                    },
                    "student": {
                        "name": "Alan John\t",
                        "phone": "8104988821\nName: 67",
                        "email": "alanjohn@karunya.edu.in\t"
                    }
        
                }
            },
            {
                "eventid": "MK25E0029",
                "eventname": "Karunya Valorant Showdown 2025",
                "description": "An intense Valorant gaming tournament organized by the Commerce and International Trade department, inviting gamers to compete and showcase their skills in a high-energy esports battle.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Commerce and International Trade",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": "70",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. V. Palanisingh",
                        "phone": "8940194307",
                        "email": "palanisingh@karunya.edu.in"
                    },
                    "student": {
                        "name": "T Raj Dinakaran \t",
                        "phone": " 9142077532\nName: 67",
                        "email": "traj@karunya.edu.in\t"
                    }
        
                }
            },
            {
                "eventid": "MK25E0005",
                "eventname": "FlightX: Aircraft Simulator Challenge",
                "description": "A technical event where participants experience the thrill of flying an aircraft through a simulator, testing their aviation skills and precision.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75\u20b9",
                "participation_strength_setlimit": "",
                "coordinators": {
                    "faculty": {
                        "name": "Mr. L. Prawin",
                        "phone": "89036085184",
                        "email": "prawinl@karunya.edu"
                    },
                    "student": {
                        "name": "Abi K\t",
                        "phone": "88707 15491\nName: 67",
                        "email": "abik@karunya.edu.in\t"
                    }
                }
            },
            {
                "eventid": "MK25E0006",
                "eventname": "AeroSustain: Sustainable Aerospace Startup Challenge",
                "description": "A technical competition challenging participants to propose innovative and sustainable solutions for the aerospace industry.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "",
                "participation_strength_setlimit": "",
                "coordinators": {
                    "faculty": {
                        "name": "Mr. Levi Reuben",
                        "phone": "7981190325",
                        "email": "levireuben@karunya.edu"
                    },
                    "student": {
                        "name": "Shivnesh\t",
                        "phone": " 99526 16163\nName: 67",
                        "email": "jshivaneshs@karunya.edu.in\t"
                    }
        
                }
            },
            {
                "eventid": "MK25E0007",
                "eventname": "AeroQuest",
                "description": "A technical quiz and problem-solving challenge focused on the fundamentals of aerospace engineering.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": "",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Sushan Lal Babu",
                        "phone": "94963 29871",
                        "email": "sushanlal@karunya.edu"
                    },
                    "student": {
                        "name": "Sandhya Besra\t",
                        "phone": " 62028 46817\nName: 67",
                        "email": "sandhyabesra@karunya.edu.in\t"
                    }
        
                }
            },
            {
                "eventid": "MK25E0008",
                "eventname": "Escape the Black Hole",
                "description": "A thrilling non-technical event where participants solve puzzles and challenges to 'escape' a simulated black hole scenario.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. R. Ajith Raj",
                        "phone": "90474 17188",
                        "email": "ajithraj@karunya.edu"
                    },
                    "student": {
                        "name": "Sheena J\t",
                        "phone": " 88259 27680\nName: 67",
                        "email": "Sheenaj@karunya.edu.in\t"
                    }
        
                }
            },
            {
                "eventid": "MK25E0009",
                "eventname": "VR Spacewalk: Mission Beyond",
                "description": "A non-technical event where participants experience a virtual reality spacewalk, simulating the challenges of an astronaut in space.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": "",
                "coordinators": {
                    "faculty": {
                        "name": "Dr. K. Anton Savio Lewise",
                        "phone": "8122846066",
                        "email": "antonlewise@karunya.edu"
                    },
                    "student": {
                        "name": "Britney Henriques\t",
                        "phone": " 90212 21030\nName: 67",
                        "email": "britneyhenriques@karunya.edu.in\t"
                    }
        
                }
            },
            {
                "eventid": "MK25E0010",
                "eventname": "IPL Auction: Bid for Glory",
                "description": "A non-technical event simulating an IPL auction where participants strategize and bid for their ideal cricket team.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non - Technical",
                "division": "Aerospace Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150",
                "participation_strength_setlimit": "",
                "coordinators": {
                    "faculty": {
                        "name": "Mr. Levi Reuben",
                        "phone": "7981190325",
                        "email": "levireuben@karunya.edu"
                    },"student": {
                        "name": "Shiban Sanjai and P Immanuel Whitefield",
                        "phone": "80563 19610 and 77809 94656",
                        "email": "shibansanjai@karunya.edu.in and immanuelwhitefield@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0083",
                "eventname": "Hashes over Roses",
                "description": "A Capture the Flag (CTF) competition is a cybersecurity event where participants engage in hacking challenges designed to test their knowledge, skills, and problem-solving abilities in a technical environment. The primary goal is for participants to find specific pieces of text, known as flags, that are hidden within intentionally vulnerable programs or websites. These flags are usually found by exploiting flaws or vulnerabilities within the system or application. The competition is often divided into categories such as reverse engineering, web security, cryptography, forensics, and binary exploitation. Participants or teams work through various challenges to capture these flags, earn points, and improve their ranking on the competition board.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Computer Science and Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "150",
                "participation_strength_setlimit": 150,
                "coordinators": {
                    "faculty": {
                        "name": "Mr. D. Shibin - 1756",
                        "phone": "8072542091\nName: 52",
                        "email": "shibin@karunya.edu"
                    },
                    "student": {
                        "name": "Nitha Zachariah",
                        "phone": "8921853641\nName: 52",
                        "email": "nithazachariah@karunya.edu.in "
                    }
                }
            },
            {
                "eventid": "MK25E0084",
                "eventname": "Cash or Crash",
                "description": "A Capture the Flag (CTF) competition is a cybersecurity event where participants engage in hacking challenges designed to test their knowledge, skills, and problem-solving abilities in a technical environment. The primary goal is for participants to find specific pieces of text, known as flags, that are hidden within intentionally vulnerable programs or websites. These flags are usually found by exploiting flaws or vulnerabilities within the system or application. The competition is often divided into categories such as reverse engineering, web security, cryptography, forensics, and binary exploitation. Participants or teams work through various challenges to capture these flags, earn points, and improve their ranking on the competition board.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Division of Civil Engineering",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Cyril Samuel JS -2828",
                        "phone": "9344835708\nName: 52",
                        "email": "cyrilsamuel88@karunya.edu"
                    },
                    "student": {
                        "name": "Milan",
                        "phone": "9497189017\nName: 52",
                        "email": "milan@karunya.edu.in "
                    }
                }
            },
            {
                "eventid": "MK25E0084",
                "eventname": "Mini carnival",
                "description": "1) Face artistry: Encouraging the participants to flow their creativity in the form of painting with the given spot topic. 2) Ring Toss: Entertaining the participants by throwing the rings on their desired materials that are arranged over the field with exciting prizes.3) Mehandhi: Encouraging the participants to flow their creative designs in the form mehandi.4) yummy Bic: Funful activity to eat biscuits on a different manner with 2 rounds fulfilling their stomach.",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Division of Digital Sciences",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.S.Sanjith - 2605",
                        "phone": "9751995269\nName: 52",
                        "email": "sanjith@karunya.edu"
                    },
                    "student": {
                        "name": "Poliyedath Lakshmi Priya, Afrin A Hakkim",
                        "phone": "9746694637, 7012000000\nName: 52",
                        "email": "Poliyedathlakshmi@karunya.edu.in, afrina@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0085",
                "eventname": "Echo-Innovators Pitch",
                "description": "Eco-Innovators Pitch is a startup-style competition where participants present innovative solutions for sustainable energy and environmental challenges. Teams or individuals pitch their ideas—ranging from renewable energy technologies to smart energy management systems—to a panel of judges, including industry experts and professors. Each pitch must highlight the problem, proposed solution, feasibility, and potential impact. Participants can use prototypes, business models, or presentations to strengthen their case. The goal is to encourage creative thinking, entrepreneurship, and real-world problem-solving in the field of sustainability.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "EEE",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "75",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. V. Evelyn Brindha",
                        "phone": "9790601852\nName: 52",
                        "email": "evelynbrindha@karunya.edu "
                    },
                    "student": {
                        "name": "Vikas balaji, Shojan Vignesh, K. Isaac James, Giftlin Joy",
                        "phone": "7695949750\nName: 52",
                        "email": "vikasbalaji@karunya.edu.in"
                    }
                }
            },
            {
                        "eventid": "MK25E0086",
                        "eventname": "Escape Room",
                        "description": "Theme of the Event: Unlock the Unknown. A Race Against Time! Step into a world of mystery and challenge in this thrilling Escape Room experience! Unlock hidden keys, analyze a crime scene, maintain balance while hitting a target, and piece together scattered clues to escape.",
                        "type": "non-tech",
                        "category": 1,
                        "category_name": "Non-Technical",
                        "division": "Biotechnology",
                        "start_time": "2025-03-21T09:00:00Z",
                        "end_time": "2025-02-10T18:55:36Z",
                        "price": "50",
                        "participation_strength_setlimit": 100,
                        "coordinators": {
                            "faculty": {
                                "name": "Dr.M.Lakshmi Prabha - 721",
                                "phone": "99442424136\nName: 52",
                                "email": "lakshmi@karunya.edu "
                            },
                            "student": {
                                "name": "Rupesh Raj, Johanna",
                                "phone": "8870234794 , 8865914780\nName: 52",
                                "email": "roopeshraj@karunya.edu.in , joannamathew@karunya.edu.in"
                            }
                        }
                },
                {
                "eventid": "MK25E0087",
                "eventname": "Bioconnections",
                "description": "Theme of the Event: Bioconnections: Decode, Recall, Conquer! Embark on an exciting journey where biology meets brainpower! Challenge your mind with thrilling word games, put your memory to the test in a fast-paced picture relay, and tune in to guess the melodies of life. Think fast, connect the dots, and race against time to claim victory.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biotechnology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50",
                "participation_strength_setlimit": 150,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Rebu Sundar- 2766, Dr. Jissin Mathew-2335",
                        "phone": "8111955514, 9944386579\nName: 52",
                        "email": "rebu@karunya.edu, jissin@karunya.edu"
                    },
                    "student": {
                        "name": "Litta Roy, Rebecca Jacey",
                        "phone": "85474 72935 , 70124009230\nName: 52",
                        "email": "vikasbalaji@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0088",
                "eventname": "Brain Buzz",
                "description": "THEME OF THE EVENT: The game proposed is a time based event where each team which consists of 4 participants race against time to complete 4 rounds/games and click the buzzer placed at the end.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biotechnology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr.Anu Jacob - 1313",
                        "phone": "8903521079\nName: 52",
                        "email": "anujacob@karunya.edu "
                    },
                    "student": {
                        "name": "Swathi Devi. S, D. Jabez Ravikumar Samraj",
                        "phone": "8098959023 , 9840393573\nName: 52",
                        "email": "vikasbalaji@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0089",
                "eventname": "Ideathon",
                "description": "Theme Of The Event: BIOINNOVATE: PIONEERING SOLUTIONS FOR A SUSTAINABLE FUTURE ",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biotechnology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 120,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Kavitha",
                        "phone": "9443390590\nName: 52",
                        "email": "kavibiotec@karunya.edu "
                    },
                    "student": {
                        "name": "C. L. Brijesh, Harshini. M",
                        "phone": "9788226611, 9952340649\nName: 52",
                        "email": "brijeshc@karunya.edu.in , harshinim@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0090",
                "eventname": "Poster presentation",
                "description": "Shaping the Future of Science and Medicine.Discover revolutionary innovation in biotechnology, from gene editing and synthetic biology to health and environmental advancements.",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Biotechnology",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Mrs. Uma Priya & Dr. Satya Sundar Mahanty ",
                        "phone": "8220866023 , 8895528225\nName: 52",
                        "email": "umapriya@karunya.edu , satyasundar@karunya.edu"
                    },
                    "student": {
                        "name": "Austy Evangeline R, Jeffina Glory J",
                        "phone": "9361451179 , 9342520366\nName: 52",
                        "email": "austyevangeline@karunya.edu , jeffinaglory@karunya.edu.in "
                    }
                }
            },
            {
                "eventid": "MK25E0091",
                "eventname": "HANDS ON TRAINING ON TERRARIUM, AND CANDLE MAKING",
                "description": "A hands on training on terrarium and candle making ",
                "type": "tech",
                "category": 1,
                "category_name": "Seminar/ Workshop",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Manjula and Dr. Sangamesh ",
                        "phone": "9480747364, 9036202550\nName: 52",
                        "email": "manjula@karunya.edu"
                    },
                    "student": {
                        "name": "Nithya Shree B.R.",
                        "phone": "9385536179\nName: 52",
                        "email": "nithyashree@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0092",
                "eventname": "Hands on training on resin art and clay modelling ",
                "description": "Resin art and Clay modelling is an upcoming art model among all age groups. Through this event we will be providing demonstration and hands on training on resin art and clay modelling ",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 100,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Dhanusha - 2582",
                        "phone": "7907199503\nName: 52",
                        "email": "dhanusha@karunya.edu"
                    },
                    "student": {
                        "name": "Harishni Premkumar",
                        "phone": "7812893648\nName: 52",
                        "email": "harishnipremkumar@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0093",
                "eventname": "Production technology of mushrooms",
                "description": "A visit will be organized to the mushroom farm. The production practices and value added products of mushroom will be explained in detail. ",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "50",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Madhumitha",
                        "phone": "8072798107\nName: 52",
                        "email": "madhumitha@karunya.edu"
                    },
                    "student": {
                        "name": "Krishnendhu",
                        "phone": "7736058083\nName: 52",
                        "email": "krishnendua21@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0094",
                "eventname": "Agri- Cine Spark",
                "description": "This is a short film event. Each team comprises of four members. They will be asked to prepare a short film of three minutes on the allocated topic. The best film will be awarded with prize. ",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Vimalin Hena ",
                        "phone": "6381937293\nName: 52",
                        "email": "vimalinhena@karunya.edu"
                    },
                    "student": {
                        "name": "KHARISH A",
                        "phone": "6383483265\nName: 52",
                        "email": "harisha22@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0095",
                "eventname": "Face Art Frenzy ",
                "description": "Face painting based on a specified theme. A group activity consisting of two members ",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Sumaiya Parveen",
                        "phone": "9443925493\nName: 52",
                        "email": "sumaiyaparveen@karunya.edu"
                    },
                    "student": {
                        "name": "Abeeshwar",
                        "phone": "7904859694\nName: 52",
                        "email": "abeeshwarra@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0096",
                "eventname": "Henna Art ",
                "description": "Team event consisting of two members. The best design will be selected as the winner ",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "100",
                "participation_strength_setlimit": 30,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Sharmili",
                        "phone": "8754750516\nName: 52",
                        "email": "sharmili@karunya.edu"
                    },
                    "student": {
                        "name": "Fathima Nesrin",
                        "phone": "8072952101\nName: 52",
                        "email": "fathimanesrin@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0097",
                "eventname": "Mind Maze",
                "description": "A PUZZLE GAME CONSISTING OF GROUPS OF TWO MEMBERS",
                "type": "non-tech",
                "category": 1,
                "category_name": "Non-Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "",
                "participation_strength_setlimit": 50,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Dinesh Kumar ",
                        "phone": "8675334438\nName: 52",
                        "email": "dineshkumarp@karunya.edu"
                    },
                    "student": {
                        "name": "Jeba Samuel",
                        "phone": "7418595187\nName: 52",
                        "email": "jebasamuel23@karunya.edu.in"
                    }
                }
            },
            {
                "eventid": "MK25E0098",
                "eventname": "Join us for a one-day hands-on training program on Personal Care Products Using Honey and Beeswax! This workshop will introduce participants to the natural benefits of honey and beeswax in skincare and personal care formulations. ",
                "description": "A PUZZLE GAME CONSISTING OF GROUPS OF TWO MEMBERS",
                "type": "tech",
                "category": 1,
                "category_name": "Technical",
                "division": "Agriculture",
                "start_time": "2025-03-21T09:00:00Z",
                "end_time": "2025-02-10T18:55:36Z",
                "price": "250",
                "participation_strength_setlimit": 25,
                "coordinators": {
                    "faculty": {
                        "name": "Dr. Sangamesh Hiremath ",
                        "phone": "7892417226\nName: 52",
                        "email": "sangamesh@karunya.edu"
                    },
                    "student": {
                        "name": "Kiran Kumar P.",
                        "phone": "9688407081\nName: 52",
                        "email": "kirankumar21@karunya.edu.in"
                    }
                }
            },
        
        
        ];
      
      setEvents(sampleData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get unique departments from events
  const departments = ["All Departments", ...new Set(events.map(event => event.division))];

  // Event handlers
  const handleEventSelect = (eventId: string) => {
    setEventDetailsLoading(true);
    setTimeout(() => {
      setSelectedEvent(eventId);
      setEventDetailsLoading(false);
    }, 500);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleFilterChange = (department: string) => {
    setDepartmentFilter(department);
    setIsSidebarOpen(false);
  };

  const addToCart = async (eventId: string) => {
    setCartStatus({
      loading: true,
      success: false,
      error: null,
    });

    try {
      // Find the event to check its price
      const event = events.find(e => e.eventid === eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }
      
      // Check if the event is free
      const isFreeEvent = !event.price || event.price === "" || event.price === "0" || event.price === 0;
      
      if (isFreeEvent) {
        // For free events, make API request to register directly
        console.log("Free event detected. Sending API request for direct registration.");
        
        // Get access token from cookies
        const accessToken = Cookies.get('accessToken');
        
        if (!accessToken) {
          throw new Error("Authentication token not found. Please log in again.");
        }
        
        // Make API request
        const response = await fetch('http://localhost:8000/api/test/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            events: [eventId]
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to register for the event");
        }
        
        const data = await response.json();
        console.log("Registration successful:", data);
        
        // Update cart status
        setCartStatus({
          loading: false,
          success: true,
          error: null,
        });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setCartStatus(prev => ({
            ...prev,
            success: false
          }));
        }, 3000);
        
      } else {
        // For paid events, check intercollege cookie and redirect
        console.log("Paid event detected. Redirecting to payment page.");
        
        // Check for intercollege cookie value
        const isInterCollege = Cookies.get('intercollege');
        
        // Redirect based on the cookie value
        if (isInterCollege === 'false') {
          window.location.href = 'https://eduserve.karunya.edu/online/PayAddOnFees.aspx';
          return;
        } else if (isInterCollege === 'true') {
          window.location.href = 'https://eduserve.karunya.edu/Online/ExternalEvents.aspx';
          return;
        }
        
        // If cookie not found or has unexpected value, show error
        if (!isInterCollege) {
          throw new Error("User type not identified. Please login again.");
        }
      }
      
    } catch (err) {
      console.error("Error in registration/payment process:", err);
      setCartStatus({
        loading: false,
        success: false,
        error: (err as Error).message,
      });
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setCartStatus(prev => ({
          ...prev,
          error: null
        }));
      }, 5000);
    }
  };

  // Format date time
  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      return date.toLocaleString();
    } catch (e) {
      return dateTimeStr;
    }
  };

  // Filter events based on department
  const filteredEvents = departmentFilter === "all" 
    ? events 
    : events.filter(event => event.division === departmentFilter);

  // Find selected event details
  const selectedEventDetails = selectedEvent 
    ? events.find(event => event.eventid === selectedEvent) 
    : null;

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed text-gray-100"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* Navbar with Solid Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-[#1e0635] shadow-lg">
        {/* Sidebar Toggle Button */}
        <button
          className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-800 rounded-md shadow-md focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <img src={menuIcon} width={30} height={30} alt="sidebar" />
        </button>

        {/* Event Title */}
        <a href="/" className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide text-center">
            MINDKRAFT 2K25
          </h1>
        </a>

        {/* Cart Button */}
        <button
          onClick={() => navigate("/cart")}
          className="relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-full transition-all flex items-center"
        >
          <img src={cartIcon} width={20} height={20} alt="cart" />
        </button>
      </nav>
      
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#1e0635] text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        {/* Sidebar Content */}
        <div className="h-screen w-64 fixed top-0 left-0 text-white p-6 overflow-y-auto scrollbar-hide">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>

          <h2 className="text-lg font-bold mb-4">Filter by Department</h2>

          {/* Scrollable list */}
          <ul className="space-y-2 pb-10">
            {departments.map((department) => (
              <li
                key={department}
                className="cursor-pointer p-2 hover:bg-purple-700 rounded transition"
                onClick={() => {
                  handleFilterChange(department === "All Departments" ? "all" : department);
                }}
              >
                {department}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 p-6 mt-[64px] transition-all duration-300 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
          </div>
        ) : (
          <div className={`${selectedEvent ? "opacity-50 pointer-events-none" : ""}`}>
            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.eventid}
                    className="relative bg-[#1e0635] border border-gray-700 backdrop-blur-lg bg-opacity-40 
                              rounded-lg p-6 shadow-lg hover:shadow-2xl transition-transform 
                              transform hover:scale-105 hover:border-purple-500 cursor-pointer duration-300"
                    onClick={() => handleEventSelect(event.eventid)}
                  >
                    {/* Neon Border Effect */}
                    <div className="absolute inset-0 border-2 border-transparent rounded-lg 
                                    transition-all duration-300 hover:border-purple-500"></div>

                    {/* Event Title */}
                    <h3 className="text-lg font-bold mb-3 text-white">{event.eventname}</h3>

                    {/* Event Details */}
                    <div className="flex flex-wrap gap-2 mb-4">
  {/* Event Date */}
  <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
    <span className="mr-1">📅</span> {new Date(event.start_time).toLocaleDateString("en-GB")}
  </span>
  
  {/* Event Time */}
  <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
    <span className="mr-1">⏰</span> {new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
  </span>

  {/* Participant Limit */}
  <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
    <span className="mr-1">👥</span> {event.participation_strength_setlimit || "No limit"}
  </span>

  {/* Event Category */}
  <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
    <span className="mr-1">🏷️</span> {event.type === "tech" ? "Technical" : "Non-Technical"}
  </span>

  {/* Price */}
  <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300">
    <span className="mr-1">💰</span> {event.price ? `₹${event.price}` : "Free"}
  </span>
</div>

{/* Register Button */}
<button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                hover:from-purple-700 hover:to-indigo-700 text-white font-medium 
                py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
  View Details
</button>
</div>
))
) : (
<p className="text-center text-gray-400 col-span-full">No events available for this department.</p>
)}
</div>
</div>
)}

{/* Event Details Modal */}
{selectedEvent && selectedEventDetails && (
<div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl text-white rounded-xl p-6 max-w-2xl w-full mx-4">
    {/* Close Button */}
    <button
      onClick={closeEventDetails}
      className="absolute top-3 right-4 text-white text-2xl hover:text-gray-300 transition"
    >
      &times;
    </button>

    {eventDetailsLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
      </div>
    ) : (
      <>
        {/* Event Name */}
        <h2 className="text-3xl font-extrabold text-white mb-4 text-center">
          {selectedEventDetails.eventname}
        </h2>

        {/* Description */}
        <p className="text-gray-200 text-sm mb-6 text-center">
          {selectedEventDetails.description}
        </p>

        {/* Coordinator Info */}
        <div className="grid grid-cols-2 gap-6 text-center mb-6">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-md">
            <p className="text-gray-300 text-sm">Student Coordinator</p>
            <p className="text-white font-semibold">
              {selectedEventDetails.coordinators?.student?.name || "Not available"}
            </p>
            {selectedEventDetails.coordinators?.student?.phone !== "Not provided" && 
             selectedEventDetails.coordinators?.student?.phone && (
              <p className="text-white text-sm">
                {selectedEventDetails.coordinators.student.phone}
              </p>
            )}
            {selectedEventDetails.coordinators?.student?.email !== "Not provided" && 
             selectedEventDetails.coordinators?.student?.email && (
              <p className="text-white text-sm">
                {selectedEventDetails.coordinators.student.email}
              </p>
            )}
          </div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-md">
            <p className="text-gray-300 text-sm">Staff Coordinator</p>
            <p className="text-white font-semibold">
              {selectedEventDetails.coordinators?.faculty?.name || "Not available"}
            </p>
            {selectedEventDetails.coordinators?.faculty?.phone !== "Not provided" && 
             selectedEventDetails.coordinators?.faculty?.phone && (
              <p className="text-white text-sm">
                {selectedEventDetails.coordinators.faculty.phone}
              </p>
            )}
            {selectedEventDetails.coordinators?.faculty?.email !== "Not provided" && 
             selectedEventDetails.coordinators?.faculty?.email && (
              <p className="text-white text-sm">
                {selectedEventDetails.coordinators.faculty.email}
              </p>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-200 text-sm px-4 mb-6 space-y-2 md:space-y-0">
          <p>
            <span className="text-white font-semibold">Division:</span> {selectedEventDetails.division}
          </p>
          <p>
            <span className="text-white font-semibold">Category:</span> {selectedEventDetails.category_name}
          </p>
          <p>
            <span className="text-white font-semibold">Start Time:</span> {formatDateTime(selectedEventDetails.start_time)}
          </p>
        </div>

        {/* Price & Capacity */}
        <div className="flex justify-between items-center text-gray-200 text-sm px-4 mb-6">
          <p>
            <span className="text-white font-semibold">Price:</span> {selectedEventDetails.price ? `₹${selectedEventDetails.price}` : "Free"}
          </p>
          <p>
            <span className="text-white font-semibold">Max Participants:</span> {selectedEventDetails.participation_strength_setlimit || "No Limit"}
          </p>
        </div>

        {/* Event Type */}
        <div className="flex justify-center items-center text-gray-200 text-sm px-4 mb-6">
          <span className="bg-purple-600/60 px-4 py-2 rounded-full">
            {selectedEventDetails.type === "tech" ? "Technical Event" : "Non-technical Event"}
          </span>
        </div>

        {/* Cart Status Notifications */}
        {cartStatus.success && (
          <div className="mb-4 p-2 bg-green-600/80 text-white text-center rounded-lg">
            Event added to cart successfully!
          </div>
        )}
        
        {cartStatus.error && (
          <div className="mb-4 p-2 bg-red-600/80 text-white text-center rounded-lg">
            Error: {cartStatus.error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={closeEventDetails}
            className="px-6 py-2 bg-gray-600/60 backdrop-blur-sm hover:bg-gray-700 rounded-lg transition shadow-md text-white"
          >
            Close
          </button>
          <button 
            onClick={() => addToCart(selectedEventDetails.eventid)}
            disabled={cartStatus.loading}
            className={`px-6 py-2 ${cartStatus.loading ? 'bg-purple-400/60' : 'bg-purple-600/80 hover:bg-purple-700'} backdrop-blur-sm rounded-lg transition shadow-md text-white flex items-center justify-center`}
          >
            {cartStatus.loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : "Register Now"}
          </button>
        </div>
      </>
    )}
  </div>
</div>
)}
</main>

{/* Current User Information (Optional) */}
<div className="fixed bottom-2 right-2 text-xs text-gray-400 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
  Logged in as: {Cookies.get('username') || 'dharshan-kumarj'} | 2025-03-11 20:34:19
</div>
</div>
);
};

export default MindkraftEventsPage;