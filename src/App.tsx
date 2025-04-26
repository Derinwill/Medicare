
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import DefaultLayout from "./layouts/default";
import ProtectedRoute from "./provider/ProtectedRoute";
import SignupPage from "./SignupPage";
import Dashboard from "./dashboard/Dashboard"; // Ensure correct casing
import AddRecord from "./AddRecord";
import './App.css'
import PatientRecordPage from "./Record";
import GrantAccessScreen from "./GrantAccess";
import PatientRecord from "./PatientRecord";
import SearchPatientRecords from "./SearchRecords";
import ManageAccess from "./ManageAccess";

function App() {
 

  return (
    <>
         <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<DefaultLayout/>}>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/addrecord" element={<ProtectedRoute><AddRecord /> </ProtectedRoute> } />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/records" element={<ProtectedRoute><PatientRecordPage /></ProtectedRoute>} />
                <Route path="/precords" element={<ProtectedRoute><PatientRecord /></ProtectedRoute>} />
                <Route path="/access" element={<ProtectedRoute><GrantAccessScreen /></ProtectedRoute>} />
                <Route path="/search-patient" element={<ProtectedRoute><SearchPatientRecords /></ProtectedRoute>} />
                <Route path="/manage-access" element={<ProtectedRoute><ManageAccess /></ProtectedRoute>} />
              </Route>
            </Routes>
          </Router>
    </>
  )
}

export default App
