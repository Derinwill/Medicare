import { useNavigate } from "react-router-dom";
import profileImage from "../assets/music-32859_1280.png"; // Ensure the correct extension

const Header = ({onClick}) => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 p-5 bg-white rounded-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-700">Medical Records</h2>
  
        {/* Button & Image Wrapper */}
        <div className="flex items-center gap-3">
          <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            + New Record
          </button>
  
          {/* Image */}
          <img
            src={profileImage}  
            alt="Profile"
            className="w-10 h-10 rounded-full object-contain"
          />
        </div>
      </div>
    );
  };
  
  export default Header;