import React, { useState } from 'react';

import NotificationComponent from '../components/Notification.component';

const QuestionContainer = ({ question, answer }) => {
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [displayAnswer, setDisplayAnswer] = useState(false);

    const handleShowAnswerClicked = () => {
        if (!displayAnswer)
        {
            setDisplayConfirmation(true);
        }
    };

    const handleAcceptClicked = () => {
        setDisplayAnswer(true);
        setDisplayConfirmation(false);
    };

    const handleDeclineClicked = () => {
        setDisplayAnswer(false);
        setDisplayConfirmation(false);
    };

    return (
        <div className="container">
            {
                displayConfirmation ?
                    <NotificationComponent message="Reveal the answer?"
                        type="message"
                        acceptText="Yes Please"
                        declineText="Not Yet"
                        onAcceptClicked={handleAcceptClicked}
                        onDeclineClicked={handleDeclineClicked} /> :
                    null
            }

            <p className="question">{question}</p>
            <div className="btn btn-primary show-answer" disabled={displayAnswer} onClick={() => handleShowAnswerClicked()}>
                Show Answer
            </div>
            {
                displayAnswer ? <p className="answer">{answer}</p> : null
            }
        </div>
    );
};

export default QuestionContainer;
