import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RateMyApp.module.css"; // CSS for styling (optional)

function RateMyApp() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false); // New state for tracking submission
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Submit the rating and comment (You can log it, save to a backend, etc.)
    console.log(`Rating: ${rating}, Comment: ${comment}`);

    // Mark as submitted
    setSubmitted(true);

    // Redirect to the welcome page after 2 seconds
    setTimeout(() => {
      navigate("/"); // Redirect to WelcomePage
    }, 2000);
  };

  return (
    <div className={styles["rate-my-app"]}>
      <h2>Rate My App</h2>

      {submitted ? (
        // Display a thank you message after submission
        <div className={styles["thank-you-message"]}>
          <h3>Thank you for submitting your rating!</h3>
          <p>Your feedback helps us improve the app.</p>
        </div>
      ) : (
        <div>
          <div className={styles["rating"]}>
            <p>Rate your experience:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? styles["filled"] : styles["empty"]}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Leave your comments..."
            rows="4"
          />

          <div className={styles["actions"]}>
            <button onClick={handleSubmit}>Submit Rating</button>
            {/* Remove logout button after submission */}
          </div>
        </div>
      )}
    </div>
  );
}

export default RateMyApp;
