import { connect } from 'react-redux';

import { default as MenuProviderComponenet } from './component';

import { ApplicationState } from '@appStore';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { UserAuthorizationMethodEnum } from '@appTypes';

import { LocalizeState } from 'react-localize-redux';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    authorized: state.app.user.authorized,
    authorizationMethod: state.app.user.authorizationMethod,
    localize: state.localize
} );

// @ts-ignore
const MenuProviderContainer = withRouter( connect( mapStateToProps )( MenuProviderComponenet ) );

export default MenuProviderContainer;

interface MapStateToPropsI {
    authorized: boolean;
    authorizationMethod: UserAuthorizationMethodEnum;
    localize: LocalizeState;
}

export interface MenuProviderProps extends
    MapStateToPropsI,
    RouteComponentProps<{}> {}
