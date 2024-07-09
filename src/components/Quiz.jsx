// import React, { useState, useEffect } from "react";
// import { questions } from "../functions/questions";
// import Question from "./Question";
// import './Quiz.css';

// function Quiz({ category, onNewCategory }) {
//   const [shuffledQuestions, setShuffledQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [score, setScore] = useState(0);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   useEffect(() => {
//     const shuffled = [...questions[category]].sort(() => Math.random() - 0.5);
//     setShuffledQuestions(shuffled.slice(0, 20));
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setQuizCompleted(false);
//   }, [category]);

//   const handleOptionClick = (option) => {
//     const currentQuestion = shuffledQuestions[currentQuestionIndex];
//     const correct = Array.isArray(currentQuestion.answer)
//       ? currentQuestion.answer.includes(option)
//       : option === currentQuestion.answer;

//     setSelectedOption(option);
//     setIsCorrect(correct);

//     if (correct) {
//       setScore(prevScore => prevScore + 1);
//       setShowModal(true);
//       setTimeout(() =>handleNextQuestion(), 1000)
//     } else {
//       setTimeout(() => handleNextQuestion(), 1000);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < shuffledQuestions.length - 1) {
//       setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//       setSelectedOption(null);
//       setIsCorrect(false);
//       setShowModal(false);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   const handleSubmit = () => {
//     setQuizCompleted(true);
//   };

//   const currentQuestion = shuffledQuestions[currentQuestionIndex];

//   if (!currentQuestion) {
//     return <div>No questions available</div>;
//   }

//   if (quizCompleted) {
//     return (
//       <div className="quiz-container">
//         <h2>Quiz Completed</h2>
//         <p>Your score: {score} out of {currentQuestionIndex + 1}</p>
//         <button onClick={onNewCategory}>Choose New Category</button>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-container">
//       <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Quiz</h2>
//       <Question
//         question={currentQuestion.questions}
//         options={currentQuestion.options}
//         onOptionClick={handleOptionClick}
//         selectedOption={selectedOption}
//         isCorrect={isCorrect}
//       />
//       <button onClick={handleSubmit}>Submit Quiz</button>
//       {/* {showModal && (
//         <div className="modal">
//           <p>Correct answer!</p>
//           <button onClick={handleNextQuestion}>Next Question</button>
//         </div> */}
//       {/* )} */}
//     </div>
//   );
// }

// export default Quiz;

import React, { useState, useEffect } from "react";
import { questions } from "../functions/questions";
import Question from "./Question";
import './Quiz.css';

const incorrectMessages = [
  { message: "Oops! Try again! 😞", emoticon: "😞" },
  { message: "Not quite right! 🤔", emoticon: "🤔" },
  { message: "Better luck next time! 😅", emoticon: "😅" },
  { message: "Keep trying! 😕", emoticon: "😕" },
];

function Quiz({ category, onNewCategory }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    const shuffled = [...questions[category]].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 20));
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  }, [category]);

  const handleOptionClick = (option) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const correct = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer.includes(option)
      : option === currentQuestion.answer;

    setSelectedOption(option);
    setIsCorrect(correct);

    if (correct) {
      setScore(prevScore => prevScore + 1);
      setModalContent({ message: "Good job! 😊", emoticon: "😊" });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        handleNextQuestion();
      }, 900);
    } else {
      const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
      setModalContent(incorrectMessages[randomIndex]);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        handleNextQuestion();
      }, 900);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsCorrect(false);
      setShowModal(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setSelectedOption(null);
      setIsCorrect(false);
      setShowModal(false);
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>Your score: {score} out of {currentQuestionIndex + 1}</p>
        <button onClick={onNewCategory}>Choose New Category</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Quiz</h2>
      <Question
        question={currentQuestion.questions}
        options={currentQuestion.options}
        onOptionClick={handleOptionClick}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
      />
      <div className="quiz-navigation">
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous Question</button>
        <button onClick={handleSubmit}>Submit Quiz</button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex >= shuffledQuestions.length - 1}>Next Question</button>
      </div>
      {showModal && (
        <div className="modal">
          <p>{modalContent.message}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;



