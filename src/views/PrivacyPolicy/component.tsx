import * as React from 'react';

import PrivacyPolicy from '@app/PrivacyPolicy/';

import { InfoEnum } from '@app/Info';
const { standalone } = InfoEnum;

const PrivacyPollicyView: React.StatelessComponent<{}> = () => {
    return (
        <PrivacyPolicy variant={ standalone } />
    );
};

export default PrivacyPollicyView;