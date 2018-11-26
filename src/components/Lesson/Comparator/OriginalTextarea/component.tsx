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
        text,
        classes
    } = props;

    const {
        comparatorTextAreaFont,
        comparatorTextAreaFontCorrect,
        comparatorTextAreaFontCorrected,
        comparatorTextAreaFontError,
        comparatorTextAreaPaper,
        comparatorTextAreaPaperShort,
        comparatorTextAreaParagraph
    } = classes;

    const scroll = (id: string): void => {
        document.getElementById(id).scrollIntoView();
    };

    const isCorrect = (ind: number): boolean => {
      return (
        ind <= currentSignIndex &&
        !isErrors(ind) &&
        !isCorrectedErrors(ind)
      );
    };

    const isErrors = (ind: number): boolean => {
      return errors.indexOf(ind) > -1;
    };

    const isCorrectedErrors = (ind: number): boolean => {
      return (
        ind <= currentSignIndex &&
        correctedErrors.indexOf(ind) > -1
      );
    };

    const textRender = () => {
        return Array.from(text || '').map((cv, index) => {
            let name = '';

            /** Check if letter is incorrect */
            switch (true) {
                case isErrors(index): {
                    name = comparatorTextAreaFontError;
                    break;
                }
                case isCorrectedErrors(index): {
                    name = comparatorTextAreaFontCorrected;
                    break;
                }
                case isCorrect(index): {
                    name = comparatorTextAreaFontCorrect;
                    break;
                }
                default: {
                    break;
                }
            };

            return (
                <span
                    className={`${comparatorTextAreaFont} ${name}`}
                    key={index}
                    id={`letter-$`}
                >
                    {cv}
                </span>
            );
        });
    };

    return (
        <Paper
            elevation={0}
            className={`${comparatorTextAreaPaper}`}
            >
            <Paper
                elevation={0}
                className={`${comparatorTextAreaPaperShort}`}
            >
                <p className={comparatorTextAreaParagraph}>
                    {textRender()}
                </p>
            </Paper>
        </Paper>
    );
};

export default withStyles(styles)(OriginalTextareaComponent);
