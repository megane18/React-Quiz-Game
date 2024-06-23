import React, { useState } from 'react';
import Quiz from './components/Quiz';
import './App.css'

function App() {
  const [category, setCategory] = useState(null);
  const [quizKey, setQuizKey] = useState(0);

  const handleCategorySelect = (newCategory) => {
    setCategory(newCategory);
    setQuizKey(prevKey => prevKey + 1);
  };

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {!category ? (
        <div className="category-selector">
          <button onClick={() => handleCategorySelect('geography')}>Geography</button>
          <button onClick={() => handleCategorySelect('history')}>History</button>
          <button onClick={() => handleCategorySelect('science')}>Science</button>
        </div>
      ) : (
        <Quiz 
          key={quizKey}
          category={category} 
          onNewCategory={() => setCategory(null)}
        />
      )}
    </div>
  );
}

export default App;
