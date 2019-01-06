import * as React from 'react';

import Button from '@material-ui/core/Button'

import { PrivacyPolicyButtonProps } from './container';

import { Translate } from 'react-localize-redux';

const OpenDialogButtonComponent: React.StatelessComponent<PrivacyPolicyButtonProps> = props => {
    const { translationId, options } = props;

    const onClick = () => props.openDialog(options);

    return (
        <Button { ...{ onClick } } variant="text" style={{ padding: 0, fontSize: '1em' }} >
            <Translate id={ translationId } />
        </Button>
    );
};

export default OpenDialogButtonComponent;
