import * as React from 'react';

import Button from '@material-ui/core/ButtonBase';

import { PrivacyPolicyButtonProps } from './container';

import { Translate } from 'react-localize-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const OpenDialogButtonComponent: React.StatelessComponent<PrivacyPolicyButtonProps> = props => {
    const { translationId, options, classes: { button } } = props;

    const onClick = () => props.openDialog(options);

    return (
        <Button
            { ...{ onClick } }
            className={ button }
        >
            <Translate id={ translationId } />
        </Button>
    );
};

export default withStyles(styles)(OpenDialogButtonComponent);
