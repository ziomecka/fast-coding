import * as React from 'react';

import { ComparatorProps } from './container';

import KeyboardListener from './KeyboardListener/';
import OriginalTextarea from './OriginalTextarea/';

const ComparatorComponent: React.StatelessComponent<ComparatorProps> = props => {
    const {
        turnedOn,
        text,
        errors,
        correctedErrors,
        currentSignIndex,
    } = props;

    return (
        <>
            <KeyboardListener {...{ turnedOn }} />
            <OriginalTextarea
                {...{
                    currentSignIndex,
                    text,
                    errors,
                    correctedErrors
                }}
            />
        </>
    );
};

export default ComparatorComponent;
