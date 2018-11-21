import * as React from 'react';
// import { Link } from 'react-router-dom';

import { LessonsProps } from './container';
import { LessonProps } from '../Lesson/container';

import TextGenerator from '../TextGenerator/container';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const LessonsComponent: React.StatelessComponent<LessonsProps> = props => {
  const {
    lessons,
    // handleOpenLesson,
    handleOpenRandomLesson,
    history
  } = props;

  const goTo = (pathname: string) => history.push(pathname);

  const handleOnClick = (lesson: LessonProps): void => {
    handleOpenRandomLesson(lesson);
    goTo(`/lessons/${lesson._id}`);
  };

  if (lessons && lessons.length) {
    return (
      <>
        {/* < TextGenerator /> */}
        <Paper>
          {lessons.map(
            (lesson: LessonProps) => {
              return (
                <Card key={lesson._id}>
                  <Button onClick={() => handleOnClick(lesson)}>
                    {lesson.title}
                  </Button>
                </Card>
              );
            }
          )}
        </Paper>
      </>
    );
  }

  /** If lessons are unavailable. */
  return null;
};

export default LessonsComponent;
