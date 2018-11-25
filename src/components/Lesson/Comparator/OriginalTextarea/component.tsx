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
                    name = classes.comparatorTextAreaFontError;
                    break;
                }
                case isCorrectedErrors(index): {
                    name = classes.comparatorTextAreaFontCorrected;
                    break;
                }
                case isCorrect(index): {
                    name = classes.comparatorTextAreaFontCorrect;
                    break;
                }
                default: {
                    break;
                }
            };

            return (
                <span className={`${classes.comparatorTextAreaFont} ${name}`} key={index}>
                    {cv}
                </span>
            );
        });
    };

    return (
        <Paper>
            <p>
                {textRender()}
            </p>
        </Paper>
    );
};

export default withStyles(styles)(OriginalTextareaComponent);
