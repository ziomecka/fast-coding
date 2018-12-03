import * as React from 'react';

import { ButtonWithHintProps } from './container';

import { Translate } from 'react-localize-redux';

/** Material */
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const ButtonWithHintComponent: React.StatelessComponent<ButtonWithHintProps> = props => {
    const { aftertext, translationId, buttonProps, classes: { buttonClass: className } } = props;

    return (
        <Button
            { ...{ ...buttonProps, ...{ className: `${buttonProps.className} ${className}` } } }
            //@ts-ignore
            aftertext={( aftertext ) ? `( ${aftertext} )` : ''}
        >
            <Translate id={translationId} />
        </Button>
    );
};

export default withStyles(styles)(ButtonWithHintComponent);
