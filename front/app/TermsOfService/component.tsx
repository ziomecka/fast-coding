import * as React from 'react';

import { TermsOfServiceProps } from './container';

import Info from '@app/Info';

const TermsOfServiceComponent: React.StatelessComponent<TermsOfServiceProps> = props => {

    return (
        <Info
            variant={ props.variant }
            id="termsOfService"
            render={ [
                { variant: 'h2', id: 'h_Main' },
                { variant: 'body1', id: 'p_1' },
                { variant: 'body1', id: 'p_2' },
                { variant: 'body1', id: 'p_3' },
                { variant: 'body1', id: 'p_4' },
                { variant: 'body1', id: 'p_5' },
                { variant: 'body1', id: 'p_6' },
                { variant: 'body1', id: 'p_7' },
                { variant: 'body1', id: 'p_8' }
            ] }
        />
    );
};

export default TermsOfServiceComponent;
