import * as React from 'react';

import Info from '@app/Info/';

const PrivacyPolicyComponent: React.StatelessComponent< {} > = () => {
    return (
        <Info render={[
            {id: 'heading', variant: 'h1'},
            {id: 'lastUpdated', variant: 'h2'},
            {id: 'paragraph1', variant: 'body1'}
        ]} />
    );
};

export default PrivacyPolicyComponent;
