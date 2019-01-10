import { connect } from 'react-redux';

import { default as TermsOfService } from './component';
import { LocalizeState } from 'react-localize-redux';

import { ApplicationState } from '@appStore';

import { InfoEnum } from '@app/Info/';

const mapStateToProps = (state: ApplicationState): IMapStateToProps => ({
    localize: state.localize
});

// @ts-ignore
const TermsOfServiceContainer = connect(mapStateToProps)(TermsOfService);

export default TermsOfServiceContainer;

interface IMapStateToProps {
    localize: LocalizeState
}

export interface TermsOfServiceProps extends IMapStateToProps {
    variant: InfoEnum;
}