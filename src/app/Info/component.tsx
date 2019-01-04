import * as React from 'react';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { InfoProps } from './container';

import { getActiveLanguage } from 'react-localize-redux';

const InfoComponent: React.StatelessComponent< InfoProps > = props => {
    const { localize, render, displayError = false } = props;
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
                        {
                            props[ code ]
                                ? props[ code ][ id ]
                                : errMessage
                        }
                    </Component>
                );
            }) }
        </Paper>
    );
};

export default InfoComponent;
