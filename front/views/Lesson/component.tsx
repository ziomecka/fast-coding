import * as React from 'react';

import { LessonViewProps } from './container';
import Lesson from '@lesson/LessonComponent/';

const LessonView: React.StatelessComponent<LessonViewProps> = props => {
    return (
        <Lesson {...props.history.location.state} />
    );
};

export default LessonView;
