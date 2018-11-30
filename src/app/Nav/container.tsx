import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { default as NavComponent } from './component';
import { WithStyles } from '@material-ui/core/styles';
import { LocalizeState } from 'react-localize-redux';
import { ApplicationState } from '../../_reducers';

const mapStateToProps = (state: ApplicationState): NavState => ({
    localize: { ...state.localize }
});

export default withRouter(connect(mapStateToProps)(NavComponent));

import { LocalizeContextProps } from 'react-localize-redux';

export interface NavProps extends NavState, WithStyles, LocalizeContextProps, RouteComponentProps<{}> {};

interface NavState {
    localize: LocalizeState
};