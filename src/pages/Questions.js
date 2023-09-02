import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsAsync, setState } from "../store/questions.slice";
import Spinner from "react-bootstrap/Spinner";
import _ from "lodash";
import QuestionNumbers from "../components/QuestionNumbers";
import Report from "../components/Report";
import Timer from "../components/Timer";

function Questions() {
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentVisted, setCurrentVisited] = useState(0);

  const questions = useSelector((state) => state.Quiz.questions.results);
  let answers = useSelector((state) => state.Quiz.answers);
  const loading = useSelector((state) => state.Quiz.isLoading);
  const email = useSelector((state) => state.Quiz.email);
  const testEnd = useSelector((state) => state.Quiz.testEnd);
  const visited_questions = useSelector(
    (state) => state.Quiz.visited_questions
  );

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
      {loading === "loading" && (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {(loading === "success" || testEnd === true) && (
        <>
          {testEnd === true ? (
            <Report questions={questions} email={email} answers={answers} />
          ) : (
            <>
              <p>
                <b className="d-flex justify-content-center mt-3">
                  Questions Index
                </b>
              </p>
              <div className="d-flex justify-content-center">
                {_.map(questions, (elem, index) => {
                  return (
                    <>
                      <QuestionNumbers
                        number={index}
                        currentVisited={currentVisted}
                        attempted={!_.isEmpty(answers[index + 1])}
                        previouslyVisited={visited_questions[index + 1] !== ""}
                        click={() => {
                          setCurrentQuestionIndex(index);
                          setSelectedOption(answers[index + 1]);
                          setCurrentVisited(index);
                          dispatch(
                            setState({
                              key: "visited_questions",
                              value: {
                                ...visited_questions,
                                [index + 1]: true,
                              },
                            })
                          );
                        }}
                      />
                      &nbsp;
                    </>
                  );
                })}
              </div>
              <Timer />
              <div className="questionBox mt-3">
                <p className="question mt-2">
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
                      &nbsp;
                      <label for={option}>{option}</label>
                      <br />
                    </>
                  );
                })}
                {currentQuestionIndex > 0 && (
                  <>
                    <br />
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={() => {
                        setSelectedOption(answers[currentQuestionIndex]);
                        setCurrentQuestionIndex((prev) => prev - 1);
                        setCurrentVisited(currentQuestionIndex - 1);
                        dispatch(
                          setState({
                            key: "visited_questions",
                            value: {
                              ...visited_questions,
                              [currentQuestionIndex]: true,
                            },
                          })
                        );
                      }}
                    >
                      Previous
                    </button>
                    &nbsp;
                  </>
                )}

                {currentQuestionIndex < questions.length - 1 && (
                  <>
                    <button
                      className="btn btn-primary btn-sm mt-3"
                      onClick={() => {
                        setSelectedOption(answers[currentQuestionIndex + 2]);
                        setCurrentQuestionIndex((prev) => prev + 1);
                        setCurrentVisited(currentQuestionIndex + 1);
                        dispatch(
                          setState({
                            key: "visited_questions",
                            value: {
                              ...visited_questions,
                              [currentQuestionIndex + 2]: true,
                            },
                          })
                        );
                      }}
                    >
                      Next
                    </button>
                    <br />
                  </>
                )}
              </div>
              <>
                <br />
                <button
                  className="d-grid col-2 mx-auto btn btn-success btn-sm"
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
          <div>
            <p className="text-danger"><b>Note:</b></p>
            <p style={{fontSize:"12px"}}><b>Red box indicates Visited Questions</b></p>
            <p style={{fontSize:"12px"}}><b>Green box indicates Attempted Questions</b></p>
            <p style={{fontSize:"12px"}}><b>Blue box indicates Current Question</b></p>
          </div>
        </>
      )}
    </div>
  );
}

export default Questions;
