import React from 'react';
import QuestionList from './components/QuestionList.component';

import questions from './constants/questions';

function App() {
  return (
    <QuestionList questions={questions} />
  );
}

export default App;
