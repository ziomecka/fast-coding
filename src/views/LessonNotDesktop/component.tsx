import * as React from 'react';

import { LessonViewProps } from './container';
import LessonNotDesktop from '@components/LessonNotDesktop';

const LessonNotDesktopView: React.StatelessComponent<LessonViewProps> = props => {
    return (
        <LessonNotDesktop />
    );
};

export default LessonNotDesktopView;