import React from "react";

export default function QuestionNumbers(props) {
  return (
    <>
      <button
        className={          
          props.currentVisited === props.number
            ? "currentVisited"
            : props.attempted
            ? "attempted"
            : props.previouslyVisited ? "previouslyVisited" : ""
        }
        onClick={props.click}
      >
        {props.number + 1}
      </button>
    </>
  );
}
