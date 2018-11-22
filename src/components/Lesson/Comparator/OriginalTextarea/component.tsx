import * as React from 'react';

import { OriginalTextAreaProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';

require('./style.sass');

const OriginalTextareaComponent: React.StatelessComponent<OriginalTextAreaProps> = props => {
    const {
        errors,
        correctedErrors,
        currentSignIndex,
        text
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
        // TODO improve
        return Array.from(text || '').map((cv, index) => {
            let name: string;

            /** Check if letter is incorrect */
            switch (true) {
                case isErrors(index): {
                    name = 'text text-error';
                    break;
                }
                case isCorrectedErrors(index): {
                    name = 'text text-corrected';
                    break;
                }
                case isCorrect(index): {
                    name = 'text text-correct';
                    break;
                }
                default: {
                    name = 'text';
                    break;
                }
            };

            return (
                <span className={name} key={index}>
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

export default OriginalTextareaComponent;
