import React from "react";

export default function QuestionNumbers(props) {
  return (
    <>
      <button onClick={props.click}>{props.number + 1}</button>
    </>
  );
}
