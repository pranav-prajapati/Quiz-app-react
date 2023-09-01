import React from "react";
import { useDispatch } from "react-redux";
import { setState, reset } from "../store/questions.slice";
import { useState, useEffect } from "react";

function Home() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const handleStart = () => {
    dispatch(setState({ key: "email", value: email }));
  };

  function isValidEmail(email) {
    // Regular expression pattern for a basic email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Test the provided email against the pattern
    return emailPattern.test(email);
  }

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz!</h1>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <br />
        {isValidEmail(email) === false && (
          <>
            <span style={{ color: "red", fontSize:"smaller" }}>Enter email in proper format</span>
            <br />
          </>
        )}
        <input
          type="submit"
          value="Start Quiz"
          disabled={!isValidEmail(email)}
          onClick={(e) => {
            handleStart();
          }}
        />
      </form>
    </div>
  );
}

export default Home;
