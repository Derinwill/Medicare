

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
      {title && <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
    return <div className={`text-gray-700 ${className}`}>{children}</div>;
  };

  export { Card, CardContent };