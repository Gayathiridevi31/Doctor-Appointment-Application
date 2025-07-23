import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./DoctorManagement.module.css";

function DoctorManagement() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();
  
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    city: "",
    image: "",
  });

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/doctors");
      setDoctors(response.data); // Only fetching from API
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleRemoveDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error("Error removing doctor:", error);
    }
  };

  const handleAddDoctor = async () => {
    try {
      const response = await axios.post("http://localhost:5000/doctors", newDoctor);
      setDoctors([...doctors, response.data]);
      setNewDoctor({ name: "", specialization: "", city: "", image: "" });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles["doctor-management"]}>
      <h2>Choose a Doctor</h2>

      <button className={styles["logout-btn"]} onClick={() => navigate("/")}>
        Logout
      </button>

      {isAdmin && (
        <div className={styles["add-doctor-form"]}>
          <h3>Add New Doctor</h3>
          <input type="text" name="name" placeholder="Doctor's Name" value={newDoctor.name} onChange={handleInputChange} />
          <input type="text" name="specialization" placeholder="Specialization" value={newDoctor.specialization} onChange={handleInputChange} />
          <input type="text" name="city" placeholder="City" value={newDoctor.city} onChange={handleInputChange} />
          <input type="text" name="image" placeholder="Image URL" value={newDoctor.image} onChange={handleInputChange} />
          <button onClick={handleAddDoctor}>Add Doctor</button>
        </div>
      )}

      <div className={styles["doctor-container"]}>
        {doctors.map((doctor) => (
          <div key={doctor._id} className={styles["doctor-item"]}>
            <img src={doctor.image || "https://via.placeholder.com/150"} alt={doctor.name} className={styles["doctor-image"]} />
            <div className={styles["doctor-info"]}>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>{doctor.city}</p>
              {!isAdmin && <Link to={`/appointment/${doctor._id}`}><button>Book Appointment</button></Link>}
            </div>
            {isAdmin && <button onClick={() => handleRemoveDoctor(doctor._id)}>Remove Doctor</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorManagement;
