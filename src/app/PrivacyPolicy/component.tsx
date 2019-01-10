import * as React from 'react';

import { PrivacyPolicyProps } from './container';
import { getActiveLanguage } from 'react-localize-redux';

import Info from '@app/Info';

const PrivacyPolicyComponent: React.StatelessComponent<PrivacyPolicyProps> = props => {

    const date = Date.UTC( 2019,0,6 );

    const effectiveOf = new Date( date ).toLocaleDateString( getActiveLanguage( props.localize ).code, {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    } );

    return (
        <Info
            variant={ props.variant }
            id="privacyPolicy"
            render={ [
                { variant: 'h2', id: 'h_Main' },
                { variant: 'body1', content: [
                    { id: 'lastUpdated', variant: 'span' } ,
                    { variant: 'span', text: ` ${ effectiveOf }.` }
                ] },
                { id: 'p_1', variant: 'body1' },
                { id: 'p_2', variant: 'body1' },
                { id: 'h_CollectionAndUse', variant: 'h3' },
                { id: 'p_3', variant: 'body1' },
                { id: 'h_LogData', variant: 'h3' },
                { id: 'p_4', variant: 'body1' },
                { id: 'h_Communications', variant: 'h3' },
                { id: 'p_5', variant: 'body1' },
                { id: 'h_Cookies', variant: 'h3' },
                { id: 'p_6', variant: 'body1' },
                { id: 'h_Security', variant: 'h3' },
                { id: 'p_7', variant: 'body1' },
                { id: 'h_Changes', variant: 'h3' },
                { variant: 'body1', content: [
                    { id: 'p_8', variant: 'span' },
                    { variant: 'span', text: ` ${ effectiveOf } `, pre: 'pre-wrap' },
                    { id: 'p_9', variant: 'span' } ,
                ] },
                { id: 'p_10', variant: 'body1' },
                { id: 'p_11', variant: 'body1' },
                { id: 'h_Contact', variant: 'h3' },
                { id: 'p_12', variant: 'body1' },
            ] }
        />
    );
};

export default PrivacyPolicyComponent;
