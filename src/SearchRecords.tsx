import React, { useState } from "react";
import { useRequest } from "./composables/http";
import { useGlobalErrorHandler } from "./composables/error";
import { SearchRecordType } from "./typings/general";

const dummyPatientRecords = [
  { id: "P001", name: "John Doe", age: 35, gender: "Male", lastVisit: "2025-04-12" },
  { id: "P002", name: "Jane Smith", age: 28, gender: "Female", lastVisit: "2025-04-10" },
  { id: "P003", name: "Alice Johnson", age: 42, gender: "Female", lastVisit: "2025-03-28" },
];

const SearchPatientRecords = () => {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [results, setResults] = useState<SearchRecordType | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
     const response = await useRequest({
        method: 'GET',
        url: `medical-record/search?uniqId=${patientId.toLowerCase()}`
      })

    const resp = response.data as SearchRecordType
    setResults(resp)
    }catch(error){
      useGlobalErrorHandler(error)
    }

    // const filtered = dummyPatientRecords.filter((record) => {
    //   return (
    //     (patientId && record.id.toLowerCase().includes(patientId.toLowerCase())) ||
    //     (patientName && record.name.toLowerCase().includes(patientName.toLowerCase()))
    //   );
    // });

    // if (filtered.length === 0) {
    //   setError("No patient found.");
    //   setResults(null);
    // } else {
    //   setError("");
    //   setResults(filtered);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex justify-center items-start py-20 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Search Patient Records</h2>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Search by Patient ID</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-sm text-black font-semibold"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>

          <div>
            {/* <label className="block text-gray-700 mb-1">Search by Patient Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black font-semibold"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            /> */}
          </div>

          <div >
            { results && <div>
              <p className="text-black"><span className="mr-2">Name:</span><span>{results?.name}</span></p>
              <p className="text-black"><span className="mr-2">Gender:</span><span>{results?.user.gender}</span></p>
              <p className="text-black"><span className="mr-2">Email:</span><span>{results?.user.email}</span></p>
              <p className="text-black"><span className="mr-2">UniqId:</span><span>{results?.uniqId}</span></p>
              <p className="text-black"><span className="mr-2">Address:</span><span>{results?.address}</span></p></div>
            
            }
            
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {results && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-blue-400">
                <tr>
                  <th className="border p-2 text-left">Patient ID</th>
                  <th className="border p-2 text-left">Condition</th>
                  <th className="border p-2 text-left">Note</th>
                  <th className="border p-2 text-left">Date Created</th>
                
                </tr>
              </thead>
              <tbody>
                {results && results.records.length > 0 && results.records.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-100">
                    <td className="border p-2 text-black">{patient.id}</td>
                    <td className="border p-2 text-black">{patient.condition}</td>
                    <td className="border p-2 text-black">{patient.note}</td>
                    <td className="border p-2 text-black">{patient.createdAt}</td>
               
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatientRecords;
