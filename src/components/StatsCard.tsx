const StatsCard = ({ title, value, icon, color }) => {
    return (
      <div className="flex items-center bg-white shadow-sm p-4 rounded-md">
        <div className={`p-3 rounded-full ${color} text-white text-xl`}>
            <img src={icon} alt="Record"className="w-10 h-10 object-contain"  />
        </div>
        <div className="ml-4">
          <h4 className="text-blue-900 font-bold">{title}</h4>
          <p className="text-2xl font-bold text-blue-900">{value}</p>
        </div>
      </div>
    );
  };
  
  export default StatsCard;