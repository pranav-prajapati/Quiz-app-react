import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setState } from "../store/questions.slice";

const Timer = () => {
  const dispatch = useDispatch();

  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (timeRemaining <= 0) {
      dispatch(setState({ key: "testEnd", value: true }));
    } else {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="d-flex justify-content-center text-danger mt-3">
      Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
