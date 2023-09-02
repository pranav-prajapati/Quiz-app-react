import React from "react";
import _ from "lodash";
import Table from "react-bootstrap/Table";

export default function Report(props) {
  return (
    <div>
      <h2 className="d-flex justify-content-center mt-3">Quiz Report</h2>
      <b><p className="text-success text-center">Email address of user :&nbsp;{props.email}</p></b>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>No.</th>
            <th style={{ width: "50%" }}>Question</th>
            <th style={{ width: "20%" }}>Given Answer</th>
            <th style={{ width: "20%" }}>Correct Answer</th>
          </tr>
        </thead>
        {_.map(props.questions, (question, index) => {
          return (
            <tbody>
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
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}
