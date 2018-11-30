import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { default as NavComponent } from './component';
import { WithStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
    ...state.localize
});

export default withRouter(connect(mapStateToProps)(NavComponent));

import { LocalizeContextProps } from 'react-localize-redux';

export interface NavProps extends WithStyles, LocalizeContextProps, RouteComponentProps<{}> {};
