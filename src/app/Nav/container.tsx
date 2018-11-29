import { connect } from 'react-redux';
import { default as NavComponent } from './component';
import { WithStyles } from '@material-ui/core';

const mapStateToProps = state => ({
    ...state.localize
});

export default connect(mapStateToProps)(NavComponent);

import { LocalizeContextProps } from 'react-localize-redux';

export interface NavProps extends WithStyles, LocalizeContextProps {};
