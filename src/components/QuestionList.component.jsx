import React from 'react';

import QuestionContainer from '../containers/Question.container';

const QuestionListComponent = ({ questions }) => {
    return (
        <div className="container">{questions && questions.length > 0 ?
            questions.map((qs) =>
                <QuestionContainer {...qs} />) :
            null}
        </div>
    );
};

export default QuestionListComponent;
