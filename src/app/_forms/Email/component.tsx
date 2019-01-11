import * as React from 'react';

import { EmailPropsI } from './container';

import getTranslation from '@shared/get.translation';
import { helperTexts } from '@shared/rules';

/** Materials */
import TextField from '@material-ui/core/TextField';

const Email: React.StatelessComponent<EmailPropsI> = props => {
    const { onChange, email, tabIndex, localize, emailValid, autoFocus } = props;

    return (
        <TextField
            inputProps={{ tabIndex, type: 'email' }}
            label={getTranslation( localize, 'emailLabel' )}
            placeholder={getTranslation( localize, 'emailPlaceholder' )}
            required
            value={email}
            {...{ onChange, autoFocus }}
            error={ !!emailValid }
            helperText={ !!emailValid
                ? helperTexts( emailValid, 'email', localize )
                : null
            }
        />
    );
};

export default Email;
