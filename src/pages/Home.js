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
    <div className="container questionBox" style={{"marginTop":"10%"}}>
      <h2 className="text-center mt-2">Welcome to the Quiz!</h2>
      <form>
        <input
        className="d-grid col-6 mx-auto"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        
        {isValidEmail(email) === false && (
          <>
            <p className="text-center" style={{ color: "red", fontSize:"smaller" }}>Enter email in proper format</p>
          </>
        )}
        <input
          type="submit"
          className="d-grid col-2 mx-auto btn btn-primary mt-3"
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
