import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiFileText,
  FiPlusCircle,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function Dashboard() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });

 

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Room", icon: <FiBox />, path: "/Room" },
    { name: "News", icon: <FiFileText />, path: "/new" },
    { name: "Add Room", icon: <FiPlusCircle />, path: "/registerroom" },
    { name: "Add News", icon: <FiFileText />, path: "/news" },
    { name: "Cabasho", icon: <FiBarChart2 />, path: "/cus" },
    { name: "Setting", icon: <FiSettings />, path: "/setting" },
  ];
  
  const handleLogOut = () => {
    localStorage.removeItem("admin");
  };

  return (
    <div className="flex bg-gray-100 text-gray-800 transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-purple-600 to-pink-700 fixed top-0 left-0 h-screen shadow-lg z-10 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-purple-400">
          {sidebarOpen && (
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Dashboard
            </h2>
          )}
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              localStorage.setItem("sidebarOpen", JSON.stringify(!sidebarOpen));
            }}
            className="text-white text-xl bg-purple-800 px-2 py-1 rounded hover:bg-purple-900 focus:outline-none"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* scrollable menu */}
        <ul className="flex flex-col gap-1 mt-6 overflow-y-auto h-[calc(100%-120px)] pb-20">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path}>
              <li
                className={`flex items-center gap-3 p-3 rounded-md mx-2 transition cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-purple-800 font-semibold border-l-4 border-yellow-400"
                    : "hover:bg-purple-600"
                } text-white`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.name}</span>}
              </li>
            </Link>
          ))}
        </ul>
<Link to= '/loginAdmin'>
        {/* logout at bottom */}
        <div className="absolute bottom-4 w-full">
          
            <li
              onClick={handleLogOut}
            
              className="flex items-center gap-3 p-3 mx-2 rounded-md hover:bg-red-600 transition cursor-pointer text-white"
            >
              <FiLogOut />
              {sidebarOpen && <span>Logout</span>}
            </li>
       
        </div>
        </Link>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        
      </div>
    </div>
  );
}

export default Dashboard;
