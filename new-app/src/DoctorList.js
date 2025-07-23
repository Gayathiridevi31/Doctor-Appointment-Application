import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./DoctorList.module.css";

function DoctorList() {
  const [dynamicDoctors, setDynamicDoctors] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  // Fetch dynamic doctors from backend
  useEffect(() => {
    axios.get("http://localhost:5000/doctors").then((res) => {
      setDynamicDoctors(res.data);
    });
  }, []);

  // Combine static and dynamic doctors
  const allDoctors = [...dynamicDoctors];

  // Filter doctors based on city & specialization
  const filteredDoctors = allDoctors.filter(
    (doctor) =>
      (selectedCity === "" || doctor.city === selectedCity) &&
      (selectedSpecialization === "" || doctor.specialization === selectedSpecialization)
  );

  return (
    <div className={styles["doctor-list"]}>
      <h2>Choose a Doctor</h2>

      {/* Filters */}
      <div className={styles["filter-container"]}>
        <label>Select City:</label>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">All Cities</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>

        <label>Select Specialization:</label>
        <select value={selectedSpecialization} onChange={(e) => setSelectedSpecialization(e.target.value)}>
          <option value="">All Specializations</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
        </select>
      </div>

      {/* Display Doctors */}
      <div className={styles["doctor-container"]}>
        {filteredDoctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className={styles["doctor-item"]}>
              <img src={doctor.image} alt={doctor.name} className={styles["doctor-image"]} />
              <div className={styles["doctor-info"]}>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <p>{doctor.city}</p>
                <Link to={`/appointment/${doctor._id}`}>
                  <button>Book Appointment</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DoctorList;
