import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const url = `https://opentdb.com/api.php?amount=20&category=${encodeURIComponent(category)}`;

  const timerRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setSelectedCategory(data.results[0].category);
        setQuestions(data.results.map((question) => ({
          ...question,
          answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
        })));
      } catch (error) {
        console.log('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [url]);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleNextQuestion();
    }
  }, [timeRemaining]);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [currentQuestionIndex]);

  const startTimer = () => {
    setTimeRemaining(120); // Reset time remaining to 2 minutes
    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const handleAnswerSelection = (answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    let newScore = 0;
    selectedAnswers.forEach((selectedAnswer, index) => {
      const question = questions[index];
      if (question.answers[selectedAnswer] === question.correct_answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  //  navigate(`/scoreboard/${newScore}`);
    navigate({
  pathname: '/scoreboard',
  search: `?category=${selectedCategory}&score=${newScore}`,
});

  };

  
const renderQuestion = () => {
  if (questions.length === 0) {
    return null; // Add loading or error handling if needed
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="questions">
      <div className="row">
        <div className="col-lg-8">
          <h1>{selectedCategory}<br />Questions</h1>
          <p>{currentQuestionIndex + 1}. {question.question}</p>
          <div className="answer">
            <div className="btn-group-vertical">
              {question.answers.map((answer, answerIndex) => (
                <button
                  key={answerIndex}
                  onClick={() => handleAnswerSelection(answerIndex)}
                  className={`btn ${selectedAnswers[currentQuestionIndex] === answerIndex ? 'active' : 'text-success'}`}
                  style={{ marginBottom: '10px', padding: '10px' ,width: '100%' }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
          <div>
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion} className="btn" style={{ marginRight: '15px', color: '#61dafb' }}>
                Previous
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion} className="btn " style={{color: '#61dafb', marginLeft:'10px'}}>
                Next
              </button>
            ) : (
              <button onClick={calculateScore} className="btn btn-primary">
                Submit
              </button>
            )}
          </div>
          <p>Total Score: {score}</p>
          <div className='text-danger'>Time Remaining: {timeRemaining} seconds</div>
        </div>
        <div className="col-lg-2">
          <table className="table questions">
            <thead>
              <tr>
                <th>Question</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{selectedAnswers[index] === undefined ? <span className="text-danger">Not Attempted</span> : <span className="text-success">Attempted</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

return (
  <div className="questions">
    {renderQuestion()}
  </div>
);

};

export default Questions;
