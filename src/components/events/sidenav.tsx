import React from "react";

interface SideNavProps {
  onFilter: (department: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SideNav: React.FC<SideNavProps> = ({ onFilter, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <div className="h-full p-6 mt-10">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4">Filter by Department</h2>
        <ul className="space-y-2">
          {[
            "All Departments",
            "Physical Sciences",
            "AIML",
            "Food Processing Technology",
            "Civil Engineering",
            "Mechanical",
            "EEE",
            "Karunya School of Management",
            "Computer Science and Engineering",
            "English",
            "Commerce and International Trade",
            "Data Science and Cyber Security",
            "Media",
            "ECE",
            "Robotics Engineering",
            "Biomedical Engineering",
            "Division of Criminology and Forensic Science",
            "Digital Sciences",
            "Aerospace Engineering",
          ].map((department) => (
            <li
              key={department}
              className="cursor-pointer p-2 hover:bg-purple-700 rounded transition"
              onClick={() => {
                onFilter(department);
                setIsOpen(false);
              }}
            >
              {department}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideNav;
