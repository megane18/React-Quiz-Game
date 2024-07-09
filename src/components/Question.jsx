// import React from "react";
// import './Question.css';

// function Question({ question, options, onOptionClick, selectedOption, isCorrect }) {
//   return (
//     <div className="container-question">
//       <h3>{question}</h3>
//       <div className="container-options">
//         {options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => onOptionClick(option)}
//             className={selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}
//             disabled={selectedOption !== null}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Question;

import React from "react";
import './Question.css';

function Question({ question, options, onOptionClick, selectedOption, isCorrect }) {
  return (
    <div className="container-question">
      <h3>{question}</h3>
      <div className="container-options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionClick(option)}
            className={selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;

