import React from 'react';
import {render} from '@testing-library/react';

import QuestionListComponent from './QuestionList.component';

import questions from '../constants/questions';

describe('The QuestionList component', () => {
    it('should display each question passed to it', () => {
        const {asFragment} = render(<QuestionListComponent questions={questions}/>);

        expect(asFragment()).toMatchSnapshot();
    });
});