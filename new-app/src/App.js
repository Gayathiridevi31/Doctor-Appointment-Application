import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import DoctorList from "./DoctorList";
import AppointmentForm from "./AppointmentForm";
import SignupPage from "./SignupPage";
import AppointmentList from "./AppointmentList";
import RateMyApp from "./RateMyApp"; 
import DoctorManagement from "./DoctorManagement";
function App() {
  const [appointments, setAppointments] = useState([]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          <Route
            path="/appointment/:doctorId"
            element={
              <AppointmentForm
                appointments={appointments}
                setAppointments={setAppointments}
              />
            }
          />
          <Route
            path="/appointment/edit/:doctorId"
            element={
              <AppointmentForm
                appointments={appointments}
                setAppointments={setAppointments}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <AppointmentList
                appointments={appointments}
                setAppointments={setAppointments}
              />
            }
          /> <Route path="/doctor-management" element={<DoctorManagement />} />
          {/* Add RateMyApp route */}
          <Route path="/rate-my-app" element={<RateMyApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 