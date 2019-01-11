import * as React from 'react';

import { OriginalTextAreaProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const OriginalTextareaComponent: React.StatelessComponent<OriginalTextAreaProps> = props => {
    const {
        errors,
        correctedErrors,
        currentSignIndex,
        lessonText,
        classes
    } = props;

    const {
        comparatorTextAreaFont,
        comparatorTextAreaFontCorrect,
        comparatorTextAreaFontCorrected,
        comparatorTextAreaFontError,
        comparatorTextAreaPaper,
        comparatorTextAreaPaperShort,
        comparatorTextAreaParagraph,
        comparatorTextAreaParagraphInvite
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
                    name = comparatorTextAreaFontError;
                    break;
                }
                case isCorrectedErrors( index ): {
                    name = comparatorTextAreaFontCorrected;
                    break;
                }
                case isCorrect( index ): {
                    name = comparatorTextAreaFontCorrect;
                    break;
                }
                default: {
                    break;
                }
            }

            return (
                <span
                    className={`${comparatorTextAreaFont} ${name}`}
                    key={index}
                    id={`letter-${index}`}
                >
                    {cv}
                </span>
            );
        } );
    };

    const inviteClass = ( currentSignIndex === -1 )
        ? comparatorTextAreaParagraphInvite
        : '';

    return (
        <Paper className={`${comparatorTextAreaPaper}`}>
            <Paper className={`${comparatorTextAreaPaperShort}`}>
                <p className={`${comparatorTextAreaParagraph} ${inviteClass}`}>
                    {textRender()}
                </p>
            </Paper>
        </Paper>
    );
};

export default withStyles( styles )( OriginalTextareaComponent );
