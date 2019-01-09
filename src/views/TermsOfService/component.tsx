import * as React from 'react';

import TermsOfService from '@app/TermsOfService/';

import { InfoEnum } from '@app/Info';
const { standalone } = InfoEnum;

const PrivacyPolicyView: React.StatelessComponent<{}> = () => {
    return (
        <TermsOfService variant={ standalone } />
    );
};

export default PrivacyPolicyView;