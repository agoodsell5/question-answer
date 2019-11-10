import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import NotificationComponent from './Notification.component';

describe('The Notificiation component', () => {

    const basicProps = {
        message: 'Just a basic message',
        type: 'success',
        acceptText: 'Yes',
        declineText: 'No',
        onAcceptClicked: jest.fn(),
        onDeclineClicked: jest.fn()
    };

    let propsForTest = {...basicProps};

    const generateComponentUnderTest = () => <NotificationComponent {...propsForTest} />;

    beforeEach(() => {
        basicProps.onAcceptClicked.mockReset();
        basicProps.onDeclineClicked.mockReset();
        propsForTest = {...basicProps};
    });

    it('should render correctly with basic expected props', () => {
        const {asFragment} = render(generateComponentUnderTest());

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render the message passed in', () => {
        const {asFragment, findByText} = render(generateComponentUnderTest());

        const message = findByText(propsForTest.message);

        expect(message).toBeDefined();
        expect(message).toMatchSnapshot();
    });

    it('should have the correct class for type "success"', () => {
        propsForTest.type = 'success';

        const {container} = render(generateComponentUnderTest());

        expect(container.children[0].className).toBe('alert alert-success');
    });

    it('should have the correct class for type "caution"', () => {
        propsForTest.type = 'caution';

        const {container} = render(generateComponentUnderTest());

        expect(container.children[0].className).toBe('alert alert-warning');
    });

    it('should have the correct class for type "error"', () => {
        propsForTest.type = 'error';

        const {container} = render(generateComponentUnderTest());

        expect(container.children[0].className).toBe('alert alert-danger');
    });

    it('should have the correct class for type "message"', () => {
        propsForTest.type = 'message';

        const {container} = render(generateComponentUnderTest());

        expect(container.children[0].className).toBe('alert alert-info');
    });

    it('should have the correct class for type undefined', () => {
        propsForTest.type = undefined;

        const {container} = render(generateComponentUnderTest());

        expect(container.children[0].className).toBe('alert alert-info');
    });

    describe('the accept button', () => {
        it('should render the accept button if acceptText is defined', () => {
            propsForTest.acceptText = basicProps.acceptText;
    
            const {getByText} = render(generateComponentUnderTest());
    
            const acceptButton = getByText(propsForTest.acceptText);
    
            expect(acceptButton).toBeDefined();
            expect(acceptButton.className).toBe('btn btn-primary');
            expect(acceptButton).toMatchSnapshot();
        });
    
        it('should call onAcceptClicked when accept button clicked', () => {
            propsForTest.acceptText = basicProps.acceptText;
    
            const {getByText} = render(generateComponentUnderTest());
    
            const acceptButton = getByText(propsForTest.acceptText);
    
            fireEvent.click(acceptButton);
    
            expect(propsForTest.onAcceptClicked).toHaveBeenCalledTimes(1);
        });    
    });

    describe('the decline button', () => {
        it('should render the accept button if acceptText is defined', () => {
            propsForTest.declineText = basicProps.declineText;
    
            const {getByText} = render(generateComponentUnderTest());
    
            const declineButton = getByText(propsForTest.declineText);
    
            expect(declineButton).toBeDefined();
            expect(declineButton.className).toBe('btn btn-danger');
            expect(declineButton).toMatchSnapshot();
        });
    
        it('should call onAcceptClicked when accept button clicked', () => {
            propsForTest.declineText = basicProps.declineText;
    
            const {getByText} = render(generateComponentUnderTest());
    
            const declineButton = getByText(propsForTest.declineText);
    
            fireEvent.click(declineButton);
    
            expect(propsForTest.onDeclineClicked).toHaveBeenCalledTimes(1);
        });
    });  
    
});