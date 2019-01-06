import * as React from 'react';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { InfoProps } from './container';

import { getActiveLanguage, Translate } from 'react-localize-redux';

/** Component used to display texts received from server that are stoed in
 *  'translations' state.
 *  However, it may be used to display translations stored in localize
 */
const InfoComponent: React.StatelessComponent< InfoProps > = props => {
    const { localize, render, displayError = false, useLocalize = false } = props;
    const errMessage = displayError ? 'Missing translation' : '';

    return (
        <Paper>
            { render.map(item => {

                const { component, variant = 'body1', id } = item;
                const Component = component || Typography;

                const componentProps = ( Component === Typography )
                    ? { variant }
                    : null;

                const { code } = getActiveLanguage(localize);

                return (
                    <Component { ...componentProps } key={ id }>
                        { !useLocalize &&
                            props[ code ]
                                ? props[ code ][ id ]
                                : errMessage
                        }
                        { useLocalize &&
                            <Translate {...{ id }} />
                        }
                    </Component>
                );
            }) }
        </Paper>
    );
};

export default InfoComponent;
