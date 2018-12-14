import { Action, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { default as NavComponent } from './component';
import { WithStyles } from '@material-ui/core/styles';
import { LocalizeState } from 'react-localize-redux';
import { ApplicationState } from '../../_reducers';

import { onLogOut } from './_duck/operations';

const mapStateToProps = (state: ApplicationState): NavState => ({
    localize: { ...state.localize }
});

const mapDispatchToProps = (dispatch: Dispatch): NavDispatchI => ({
    logOut: () => dispatch(onLogOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavComponent));

import { LocalizeContextProps } from 'react-localize-redux';

export interface NavProps extends NavState, WithStyles, LocalizeContextProps, RouteComponentProps<{}>, NavDispatchI {};

interface NavState {
    localize: LocalizeState
};

interface NavDispatchI {
    logOut: () => Action;
}