import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AppointmentList.module.css"; 
function AppointmentList({ appointments, setAppointments }) {
  const navigate = useNavigate();
  const handleEditAppointment = (appointmentId) => {
    navigate(`/appointment/edit/${appointmentId}`);
  };
  return (
    <div className={styles["appointment-list"]}>
      <h2>Thank You for Booking an Appointment!</h2>
      <p>Your appointment details are listed below:</p>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} className={styles["appointment-item"]}>
              <div className={styles["appointment-details"]}>
                <h3>Doctor ID: {appointment.doctorId}</h3>
                <p>Patient Name: {appointment.patientName}</p>
                <p>Address: {appointment.address}</p>
                <p>Date of Birth: {appointment.dob}</p>
                <p>Age: {appointment.age}</p>
                <p>Phone Number: {appointment.phoneNumber}</p>
                <p>Appointment Date: {appointment.appointmentDate}</p>
                <p>Appointment Time: {appointment.appointmentTime}</p>
                <p>Issue Type: {appointment.issueType}</p>
              </div>
              <div className={styles["appointment-actions"]}>
                <button
                  onClick={() => handleEditAppointment(appointment.doctorId)}
                >
                  Edit Appointment
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link to="/doctor-list">
        <button>Back to Doctor List</button>
      </Link>
      <Link to="/rate-my-app">
        <button>Rate My App</button>
      </Link>
    </div>
  );
}
export default AppointmentList;
