import * as React from 'react';

import { Translate } from 'react-localize-redux';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

import { NotDektopProps } from './container';

const NotDesktopComponent: React.StatelessComponent< NotDektopProps > = props => {
    const { classes: { FCPaper }} = props;

    const typographyVariant = 'h2';

    return (
        <Paper className={ FCPaper }>
            <Typography variant={ typographyVariant }>
                <Translate id="notDesktopInfo" />
            </Typography>
        </Paper>
    );
};

export default withStyles( styles )( NotDesktopComponent );
