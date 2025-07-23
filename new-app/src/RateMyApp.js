import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RateMyApp.module.css";

function RateMyApp() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/ratings", { stars: rating, comment });
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      alert("Failed to submit rating. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className={styles["rate-my-app"]}>
      <h2>Rate My App</h2>

      {submitted ? (
        <div className={styles["thank-you-message"]}>
          <h3>Thank you for submitting your rating!</h3>
          <p>Your feedback helps us improve the app.</p>
        </div>
      ) : (
        <>
          <div className={styles["rating"]}>
            <p>Rate your experience:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? styles["filled"] : styles["empty"]}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your comments..."
            rows={4}
          />

          <div className={styles["actions"]}>
            <button onClick={handleSubmit} disabled={rating === 0}>
              Submit Rating
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RateMyApp;
