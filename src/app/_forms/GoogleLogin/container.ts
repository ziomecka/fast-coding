import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as GoogleLogin } from './component';
import { ApplicationState } from '@appStore';

import { onSetTranslations, onStartUi } from './_duck/operations';

import { LocalizeState } from 'react-localize-redux';
import { WithStyles } from '@material-ui/core/styles/withStyles';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    localize: state.localize
} );

const mapDispatchToProps = ( dispatch: Dispatch ): GoogleLoginDispatch => ( {
    startUI: ui => dispatch( onStartUi ( ui ) ),
    setTranslations: () => dispatch( onSetTranslations() )
} );

const GoogleLoginContainer = connect( mapStateToProps, mapDispatchToProps )( GoogleLogin );

export default GoogleLoginContainer;

interface MapStateToPropsI {
    localize: LocalizeState
}

export interface GoogleLoginDispatch {
    startUI: (ui: any) => void;
    setTranslations: () => void;
}

export interface GoogleLoginProps extends
    GoogleLoginDispatch,
    MapStateToPropsI,
    WithStyles {}
