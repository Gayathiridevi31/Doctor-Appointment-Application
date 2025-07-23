import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AppointmentForm.module.css";
function AppointmentForm({ appointments, setAppointments }) {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [appointment, setAppointment] = useState({
    patientName: "",
    address: "",
    dob: "",
    age: "",
    phoneNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    issueType: "",
  });

  useEffect(() => {
    if (doctorId && doctorId !== "edit") {
      const appointmentToEdit = appointments.find(
        (app) => app.doctorId === doctorId
      );
      if (appointmentToEdit) {
        setAppointment(appointmentToEdit);
        setIsEditing(true);
      }
    }
  }, [doctorId, appointments]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.doctorId === doctorId ? { ...app, ...appointment } : app
        )
      );
    } else {
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        { ...appointment, doctorId: doctorId },
      ]);
    }
    navigate("/appointments");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles["appointment-form"]}>
      <h2>{isEditing ? "Edit Appointment" : "Book Appointment"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            placeholder="Your Name"
            value={appointment.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Your Address"
            value={appointment.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={appointment.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Your Age"
            value={appointment.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Your Phone Number"
            value={appointment.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="appointmentTime">Appointment Time:</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="issueType">Type of Issue:</label>
          <select
            id="issueType"
            name="issueType"
            value={appointment.issueType}
            onChange={handleChange}
            required
          >
            <option value="">Select an Issue</option>
            <option value="General Checkup">General Checkup</option>
            <option value="Emergency">Emergency</option>
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>

        <button type="submit">
          {isEditing ? "Save Changes" : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
