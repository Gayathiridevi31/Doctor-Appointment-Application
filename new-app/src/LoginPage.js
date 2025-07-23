import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (isAdmin) => {
    if (!username || !password) {
      alert("Please enter valid credentials");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
        isAdmin,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);

        if (response.data.isAdmin) {
          navigate("/doctor-management"); // Admin Dashboard
        } else {
          navigate("/doctor-list"); // User Dashboard
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed! Please check your credentials.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to Signup Page
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      <div className={styles["button-container"]}>
        <button onClick={() => handleLogin(false)}>User Login</button>
        <button onClick={() => handleLogin(true)}>Admin Login</button>
      </div>

      {/* Sign Up Section */}
      <div className={styles["signup-container"]}>
        <p>Don't have an account?</p>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginPage;
