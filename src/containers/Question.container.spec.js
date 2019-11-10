import React from 'react';
import {render, cleanup, waitForElement, fireEvent, wait, waitForElementToBeRemoved} from '@testing-library/react';

import QuestionContainer from './Question.container';

import NotificationComponent from '../components/Notification.component';

import questions from '../constants/questions';

const showAnswerText = /Show Answer/;
const notificationText = /Reveal the answer/;
const acceptButtonText = /Yes Please/;
const declineButtonText = /Not Yet/;

describe('The Question container', () => {
    const basicProps = {
        question: questions[0].question,
        answer: questions[0].answer
    };

    let propsForTest = {...basicProps};

    const generateComponentUnderTest = () => <QuestionContainer {...propsForTest} />;

    beforeEach(() => {
        propsForTest = {...basicProps};
    });

    describe('the initial state', () => {
        it('renders the question', () => {
            const {getByText} = render(generateComponentUnderTest());

            const questionElement = getByText(propsForTest.question);

            expect(questionElement).toBeDefined();
            expect(questionElement.className).toBe('question');
            expect(questionElement).toMatchSnapshot();
        });

        it('renders the show answer button enabled', () => {
            const {getByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);

            expect(showAnswerElement).toBeDefined();
            expect(showAnswerElement.className).toBe('btn btn-primary show-answer');
            expect(showAnswerElement).toMatchSnapshot();
        });

        it('doesnt render the notification component', () => {
            const {queryAllByText} = render(generateComponentUnderTest());

            const notificationComponents = queryAllByText(notificationText);

            expect(notificationComponents.length).toBe(0);
        });
    });

    describe('after show answer is clicked', () => {
        it('should show the notification', () => {
            const {queryAllByText, getByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            const notificationComponents = queryAllByText(notificationText);

            expect(notificationComponents.length).toBe(1);
            expect(notificationComponents[0]).toMatchSnapshot();
        });

        it('should have notification with accept button', () => {
            const {getByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            const acceptButton = getByText(acceptButtonText);

            expect(acceptButton).toBeDefined();
            expect(acceptButton).toMatchSnapshot();
        });

        it('should have notification with decline button', () => {
            const {getByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            const declineButton = getByText(declineButtonText);

            expect(declineButton).toBeDefined();
            expect(declineButton).toMatchSnapshot();
        });
    });

    describe('after accept is clicked', () => {
        it('should display the answer with correct class', async () => {
            const {getByText, findByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            await waitForElement(() => findByText(notificationText));

            const acceptButton = getByText(acceptButtonText);
            fireEvent.click(acceptButton);
            
            const answer = await waitForElement(() => getByText(propsForTest.answer));

            expect(answer).toBeDefined();
            expect(answer.className).toBe('answer');
            expect(answer).toMatchSnapshot();
        });

        it('should disable the show answer button', async () => {
            const {getByText, findByText, queryAllByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            await waitForElement(() => findByText(notificationText));

            const acceptButton = getByText(acceptButtonText);
            fireEvent.click(acceptButton);

            // await waitForElementToBeRemoved(() => getByText(notificationText));

            // fireEvent.click(showAnswerElement);

            const notificationComponents = queryAllByText(notificationText);

            expect(notificationComponents.length).toBe(0);

            fireEvent.click(showAnswerElement);

            const notificationComponentsAgain = queryAllByText(notificationText);

            expect(notificationComponentsAgain.length).toBe(0);
        });

        it('should remove the notification', async () => {
            const {asFragment, getByText} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            waitForElementToBeRemoved(() => getByText(notificationText))
                .then(() => expect(asFragment()).toMatchSnapshot());

            const acceptButton = getByText(acceptButtonText);
            fireEvent.click(acceptButton);
        });
    });

    describe('after decline clicked', () => {
        it('should remove the notification', async () => {
            const {getByText, asFragment} = render(generateComponentUnderTest());

            const showAnswerElement = getByText(showAnswerText);
            fireEvent.click(showAnswerElement);

            waitForElementToBeRemoved(() => getByText(notificationText))
                .then(() => expect(asFragment()).toMatchSnapshot());

            const declineButton = getByText(declineButtonText);
            fireEvent.click(declineButton);

        });
    });
});