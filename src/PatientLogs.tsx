import React from "react";
 
const dummyLogs = [
  {
    doctorName: "Dr. Emily Carter",
    accessTime: "2025-04-28 10:45 AM",
    accessType: "View",
    reason: "Routine check-up",
  },
  {
    doctorName: "Dr. John Smith",
    accessTime: "2025-04-27 3:20 PM",
    accessType: "Edit",
    reason: "Updated blood test results",
  },
  {
    doctorName: "Dr. Anita Kumar",
    accessTime: "2025-04-26 9:10 AM",
    accessType: "Create Record",
    reason: "Initial consultation notes",
  },
];
 
const PatientAccessLogs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex justify-center items-start py-20 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Access Logs
        </h2>
 
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-200">
              <tr>
                <th className="border p-3 text-left">Doctor</th>
                <th className="border p-3 text-left">Access Time</th>
                <th className="border p-3 text-left">Type</th>
                <th className="border p-3 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {dummyLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border p-3">{log.doctorName}</td>
                  <td className="border p-3">{log.accessTime}</td>
                  <td className="border p-3">{log.accessType}</td>
                  <td className="border p-3">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        {dummyLogs.length === 0 && (
          <p className="text-center mt-6 text-gray-600">No access logs found.</p>
        )}
      </div>
    </div>
  );
};
 
export default PatientAccessLogs;