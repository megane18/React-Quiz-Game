import React, { useState } from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [category, setCategory] = useState(null);
  const [quizKey, setQuizKey] = useState(0);
  const [quizHistory, setQuizHistory] = useState([]);

  const handleCategorySelect = (newCategory) => {
    setCategory(newCategory);
    setQuizKey(prevKey => prevKey + 1);
    setQuizHistory([...quizHistory, newCategory]);
  };

  const handleBack = () => {
    const newHistory = [...quizHistory];
    newHistory.pop();
    const previousCategory = newHistory[newHistory.length - 1] || null;
    setCategory(previousCategory);
    setQuizHistory(newHistory);
  };

  return (
    <div className="app">
      <h1>QuizMaster</h1>
      {!category ? (
        <div className="category-selector">
          <button onClick={() => handleCategorySelect('geography')}>Geography</button>
          <button onClick={() => handleCategorySelect('history')}>History</button>
          <button onClick={() => handleCategorySelect('science')}>Science</button>
        </div>
      ) : (
        <>
          <Quiz 
            key={quizKey}
            category={category} 
            onNewCategory={() => setCategory(null)}
          />
          <button onClick={handleBack} className="back-button">Go Back</button>
        </>
      )}
    </div>
  );
}

export default App;
