import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (isAdmin = false) => {
    if (!username || !password) {
      alert("Please enter valid credentials");
      return;
    }

    // Store admin flag in localStorage
    if (isAdmin) {
      localStorage.setItem("isAdmin", "true");
      navigate("/doctor-management"); // Admin login redirects to DoctorManagement
    } else {
      localStorage.setItem("isAdmin", "false");
      navigate("/doctor-list"); // User login redirects to DoctorList
    }

    console.log("Logging in with:", { username, password });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={() => handleLogin(false)}>User Login</button>
      <button onClick={() => handleLogin(true)}>Admin Login</button>

      <div className={styles["signup-container"]}>
        <p>Don't have an account?</p>
        <a href="#" onClick={handleSignUp}>
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
