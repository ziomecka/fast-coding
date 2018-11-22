import * as React from 'react';
import { Link } from 'react-router-dom';

import { LessonsProps } from './container';
import { LessonProps } from '../Lesson/container';

import TextGenerator from '../TextGenerator/container';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

require('./style.sass');

const LessonsComponent: React.StatelessComponent<LessonsProps> = props => {
    const {
        lessons,
        // randomLesson,
        handleOpenLesson,
        handleOpenRandomLesson,
    } = props;

    const elevation = 3;
    const randomLesson = true;

    const handleOnClick = (lesson: LessonProps): void => {
        if (randomLesson) {
            handleOpenRandomLesson(lesson);
        } else {
            handleOpenLesson(lesson);
        }
    };

    if (lessons && lessons.length) {
        return (
            // {/* < TextGenerator /> */}
            <Paper id="lessons">
                {lessons.map((lesson: LessonProps) => {
                    const { _id, title } = lesson;

                    return (
                        <Card
                            key={_id}
                            id={`card-${_id}`}
                            {...{ elevation }}
                        >
                            <Link
                                id={`link-${_id}`}
                                to={`/lessons/${_id}`}
                                onClick={() => handleOnClick(lesson)}
                            >
                                {title}
                            </Link>
                        </Card>
                    );
                })}
            </Paper>
        );
    }

    /** If lessons are unavailable. */
    return null;
};

export default LessonsComponent;
