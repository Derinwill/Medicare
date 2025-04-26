import { useState } from "react";
import { FaBars, FaTimes, FaClipboardList, FaPlus, FaShareAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({onClick}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close sidebar when clicking a menu item
  const closeSidebar = () => {setIsOpen(false)};

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-3 text-white bg-blue-500 fixed top-4 left-4 rounded-md z-50" 
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:static lg:flex lg:flex-col lg:w-64 z-50 h-screen rounded-tr-2xl rounded-br-2xl `}
      >
        {/* Close Button for Mobile */}

        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-600 p-5">📘 MedRecords</h2>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 p-5">
          <Link to="/records" onClick={closeSidebar} className="flex items-center space-x-2 text-blue-500 font-semibold p-2 bg-gray-100 rounded-md">
            <FaClipboardList /> <span>Records</span>
          </Link>
          <Link to="/addrecord" onClick={closeSidebar} className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 p-2">
            <FaPlus /> <span>Add Record</span>
          </Link>
          <Link to="/share-record" onClick={closeSidebar} className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 p-2">
            <FaShareAlt /> <span>Share Record</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-5">
          <button onClick={onClick} className="flex items-center space-x-2 text-red-500 p-2">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-40 lg:hidden z-40" 
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;