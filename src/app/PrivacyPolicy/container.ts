import { connect } from 'react-redux';

import { default as PrivacyPolicy } from './component';
import { LocalizeState } from 'react-localize-redux';

import { ApplicationState } from '@appStore';

import { InfoEnum } from '@app/Info/';

const mapStateToProps = (state: ApplicationState): IMapStateToProps => ({
    localize: state.localize
});

// @ts-ignore
const PrivacyPolicyContainer = connect(mapStateToProps)(PrivacyPolicy);

export default PrivacyPolicyContainer;

interface IMapStateToProps {
    localize: LocalizeState
}

export interface PrivacyPolicyProps extends IMapStateToProps {
    variant: InfoEnum;
};