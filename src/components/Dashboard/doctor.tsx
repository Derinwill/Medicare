
import Header from "../../components/Header";
import StatsCard from "../../components/StatsCard";
import RecordTable from "../../components/RecordTable";
import totalrecordsimg from "../../assets/svg4.png";
import sharedrecordsimg from "../../assets/svg3.png"
import hospitalsimg from "../../assets/scg2.png"
import doctorsimg from "../../assets/svg.png"
import { useNavigate } from "react-router-dom";
import PatientRecordPage from "../../Record";
import { useEffect, useState } from "react";
import { useRequest } from "../../composables/http";

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState<Array<{
      condition: string;
      createdAt: string;
      note: string;
      patient: {
        id: string;
        name: string
      }
    }>>([])
    
    
      useEffect( ()=>{
        const fetchAllRecord = async () => {
        try {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const allRecords = await useRequest({
            method: 'GET',
            url: 'medical-record'
          });
          console.log(allRecords);
          // Do something with the data
          setRecords(allRecords.data)
          return allRecords.data;
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      }
    
      fetchAllRecord()
      }, [])
  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-blue-300 to-purple-300">
      
      {/* Main Content */}
      <div className="flex-col w-full p-4 sm:p-6 rounded-tl-2xl rounded-bl-2xl drop-shadow-2xl shadow-black">
      <Header onClick={() => navigate("/signup")} />

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatsCard icon={totalrecordsimg} title="Total Records" value={records.length} />
          <StatsCard icon={hospitalsimg} title="Hospitals" value="1" />
          <StatsCard icon={doctorsimg} title="Doctors" value="8" />
        </div>

        {/* Records Table */}
        <div className="mt-6 w-full">
         <PatientRecordPage class="w-full"/>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;