import * as React from 'react';

import { EmailPropsI } from './container';

import getTranslation from '../../shared/get.translation';

/** Materials */
import TextField from '@material-ui/core/TextField';

const Email: React.StatelessComponent<EmailPropsI> = props => {
    const { onChange, value, tabIndex, localize } = props;

    return (
        <TextField
            inputProps={{ tabIndex }}
            label={getTranslation(localize, 'emailLabel')}
            placeholder={getTranslation(localize, 'emailPlaceholder')}
            required
            type="email"
            {...{ onChange, value }}
       />
    );
};

export default Email;