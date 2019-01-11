import * as React from 'react';

import { FormHelperTextProps } from './container';

import { Translate } from 'react-localize-redux';

import FormHelperText from '@material-ui/core/FormHelperText';

const FormHelperTextComponent: React.StatelessComponent<FormHelperTextProps> = props => {
    const { formHelperText } = props;

    return (
        <FormHelperText>
            { formHelperText && ( <Translate id={formHelperText}/> )}
        </FormHelperText>
    );
};

export default FormHelperTextComponent;
