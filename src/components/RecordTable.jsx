import { FaEye, FaShareAlt } from "react-icons/fa";

const RecordsTable = () => {
  const records = [
    { id: "#MR-2025-001", date: "Jan 15, 2025", type: "General Checkup", hospital: "Central Hospital", doctor: "Dr. Smith", status: "Complete" },
    { id: "#MR-2025-002", date: "Jan 12, 2025", type: "Blood Test", hospital: "Metro Medical", doctor: "Dr. Johnson", status: "Pending" },
    { id: "#MR-2025-003", date: "Jan 10, 2025", type: "X-Ray", hospital: "City Hospital", doctor: "Dr. Williams", status: "Complete" }
  ];

  return (
    <div className="bg-white p-5 rounded-md ">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Records</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="p-2">Record ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
            <th className="p-2">Hospital</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="border-t text-gray-700">
              <td className="p-2">{record.id}</td>
              <td className="p-2">{record.date}</td>
              <td className="p-2">{record.type}</td>
              <td className="p-2">{record.hospital}</td>
              <td className="p-2">{record.doctor}</td>
              <td className="p-2">
                <span className={`px-3 py-1 rounded-full text-white ${record.status === "Complete" ? "bg-green-500" : "bg-yellow-500"}`}>
                  {record.status}
                </span>
              </td>
              <td className="p-2 flex space-x-2">
                <FaEye className="text-blue-500 cursor-pointer" />
                <FaShareAlt className="text-gray-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;