import React from "react";
import _ from "lodash";

export default function Report(props) {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr>
          <th style={{ width: "10%" }}>No.</th>
          <th style={{ width: "50%" }}>Question</th>
          <th style={{ width: "20%" }}>Given Answer</th>
          <th style={{ width: "20%" }}>Correct Answer</th>
        </tr>
        {_.map(props.questions, (question, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{question.question}</td>
              <td>
                {_.isEmpty(props.answers[index + 1])
                  ? "N/A"
                  : props.answers[index + 1]}
              </td>
              <td>{question.correct_answer}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
