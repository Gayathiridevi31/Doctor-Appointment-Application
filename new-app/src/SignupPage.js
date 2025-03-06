
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!username || !password) {
      alert("Please fill in all fields");
      return;

      
    }
    console.log("Signing up with:", { username, password });
    navigate("/login");
  };

  return (
    <div className={styles["signup-container"]}>
      <h2>Sign Up</h2>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignupPage;
