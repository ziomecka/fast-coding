import { Action, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { default as NavComponent } from './component';
import { WithStyles } from '@material-ui/core/styles';
import { LocalizeState, LocalizeContextProps } from 'react-localize-redux';
import { ApplicationState } from '@appStore';

import { onLogOut } from './_duck/operations';

import { DialogDispatch, mapDispatchToProps as dialogMapDispatchToProps } from '@shared/dialog';

import { IWithMedia } from '@app/Media/';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    localize: { ...state.localize },
    login: state.app.user.login,
    displayName: state.app.user.displayName,
} );

const mapDispatchToProps = ( dispatch: Dispatch ): NavDispatchI => ( {
    logOut: () => dispatch( onLogOut() ),
    ...dialogMapDispatchToProps( dispatch )
} );

// @ts-ignore
export default withRouter( connect( mapStateToProps, mapDispatchToProps )( NavComponent ) );

export interface NavProps extends
MapStateToPropsI,
WithStyles,
LocalizeContextProps,
RouteComponentProps<{}>,
NavDispatchI,
IWithMedia {}

interface MapStateToPropsI {
    localize: LocalizeState;
    login: string;
    displayName: string;
}

interface NavDispatchI extends DialogDispatch {
    logOut: () => Action;
}
