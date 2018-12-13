import * as React from 'react';

import { FormHelperTextProps } from './container';

import { Translate } from 'react-localize-redux';

const FormHelperTextComponent: React.StatelessComponent<FormHelperTextProps> = props => {
    const { formHelperText } = props;

    return (
        <>
            { formHelperText && ( <Translate id={formHelperText}/> )}
        </>
    );
};

export default FormHelperTextComponent;