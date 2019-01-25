import * as React from 'react';

import { LessonTextProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const LessonTextComponent: React.StatelessComponent<LessonTextProps> = props => {
    const {
        errors,
        correctedErrors,
        currentSignIndex,
        lessonText,
        classes
    } = props;

    const {
        fontClass,
        fontCorrectClass,
        fontCorrectedClass,
        fontErrorClass,
        paperClass,
        paperShortClass,
        paragraphClass,
        inviteTitleClass
    } = classes;

    const isCorrect = ( ind: number ): boolean => {
        return (
            ind <= currentSignIndex &&
            !isErrors( ind ) &&
            !isCorrectedErrors( ind )
        );
    };

    const isErrors = ( ind: number ): boolean => errors.indexOf( ind ) > -1;

    const isCorrectedErrors = ( ind: number ): boolean => {
        return (
            ( ind <= currentSignIndex ) &&
            ( correctedErrors.indexOf( ind ) > -1 )
        );
    };

    const textRender = () => {
        return Array.from( lessonText || '' ).map( ( cv, index ) => {
            let name = '';

            /** Check if letter is incorrect */
            switch ( true ) {
                case isErrors( index ): {
                    name = fontErrorClass;
                    break;
                }
                case isCorrectedErrors( index ): {
                    name = fontCorrectedClass;
                    break;
                }
                case isCorrect( index ): {
                    name = fontCorrectClass;
                    break;
                }
                default: {
                    break;
                }
            }

            return (
                <span
                    className={`${fontClass} ${name}`}
                    key={index}
                    id={`letter-${index}`}
                >
                    {cv}
                </span>
            );
        } );
    };

    const inviteClass = ( currentSignIndex === -1 )
        ? inviteTitleClass
        : '';

    return (
        <Paper className={`${paperClass}`}>
            <Paper className={`${paperShortClass}`}>
                <p className={`${paragraphClass} ${inviteClass}`}>
                    {textRender()}
                </p>
            </Paper>
        </Paper>
    );
};

export default withStyles( styles )( LessonTextComponent );
