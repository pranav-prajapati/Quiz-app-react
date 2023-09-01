import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsAsync, setState } from "../store/questions.slice";
import { current } from "@reduxjs/toolkit";
import _ from "lodash";
import QuestionNumbers from "../components/QuestionNumbers";
import Report from "../components/Report";
import Timer from "../components/Timer";

function Questions() {
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  // const [checkedValue,setCheckedValue]=useState("");

  const questions = useSelector((state) => state.Quiz.questions.results);
  let answers = useSelector((state) => state.Quiz.answers);
  const loading = useSelector((state) => state.Quiz.isLoading);
  const email = useSelector((state) => state.Quiz.email);
  const testEnd = useSelector((state) => state.Quiz.testEnd);

  const currentQuestion = _.get(questions, [currentQuestionIndex, "question"]);

  useEffect(() => {
    if (testEnd === false) {
      dispatch(getQuestionsAsync());
    }
  }, [email]);

  let optionsList;

  if (loading === "success") {
    let correctAnswer = _.get(questions, [
      currentQuestionIndex,
      "correct_answer",
    ]);

    let inCorrectAnswer = _.get(questions, [
      currentQuestionIndex,
      "incorrect_answers",
    ]);

    optionsList = [...inCorrectAnswer];
    optionsList.splice(_.random(optionsList.length), 0, correctAnswer);
  }

  const handleOptionChange = (index, value) => {
    setSelectedOption(value);
    dispatch(
      setState({ key: "answers", value: { ...answers, [index]: value } })
    );
  };

  return (
    <div>
      {loading === "loading" && <p>loading.........</p>}
      {(loading === "success" || testEnd === true) && (
        <>
          {testEnd === true ? (
            <Report questions={questions} answers={answers} />
          ) : (
            <>
              <Timer />
              <p>
                <b>Questions Index</b>
              </p>
              {_.map(questions, (elem, index) => {
                return (
                  <>
                    <QuestionNumbers
                      number={index}
                      click={() => {
                        setCurrentQuestionIndex(index);
                        setSelectedOption(answers[index + 1]);
                      }}
                    />
                    &nbsp;
                  </>
                );
              })}
              <p className="question">
                <b>{currentQuestionIndex + 1}.&nbsp;</b>
                {currentQuestion}
              </p>
              {_.map(optionsList, (option) => {
                return (
                  <>
                    <input
                      type="radio"
                      id={option}
                      name="fav_language"
                      value={option}
                      checked={
                        selectedOption === option &&
                        !_.isEmpty(answers[currentQuestionIndex + 1])
                      }
                      onChange={(e) => {
                        handleOptionChange(
                          currentQuestionIndex + 1,
                          e.target.value
                        );
                      }}
                    />
                    <label for={option}>{option}</label>
                    <br />
                  </>
                );
              })}
              {currentQuestionIndex > 0 && (
                <>
                  <br />
                  <button
                    onClick={() => {
                      setSelectedOption(answers[currentQuestionIndex]);
                      setCurrentQuestionIndex((prev) => prev - 1);
                    }}
                  >
                    Previous
                  </button>
                </>
              )}
              &nbsp;
              {currentQuestionIndex < questions.length - 1 && (
                <>
                  <button
                    onClick={() => {
                      setSelectedOption(answers[currentQuestionIndex + 2]);
                      setCurrentQuestionIndex((prev) => prev + 1);
                    }}
                  >
                    Next
                  </button>
                  <br />
                </>
              )}
              <>
                <br />
                <button
                  onClick={() => {
                    dispatch(setState({ key: "testEnd", value: true }));
                  }}
                >
                  Finish Test
                </button>
                <br />
              </>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Questions;
