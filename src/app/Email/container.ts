import { connect } from 'react-redux';

import { default as Email } from './component';

import { StandardTextFieldProps } from '@material-ui/core/TextField';

import { LocalizeState } from 'react-localize-redux';
import { ApplicationState } from '@appStore';

import { EmailState } from './_duck/reducers';

const mapStateToProps = ( state: ApplicationState ): MapStateToPropsI => ( {
    localize: state.localize
} );

const EmailContainer = connect( mapStateToProps )( Email );

export default EmailContainer;

export interface MapStateToPropsI {
    localize: LocalizeState
}

export interface EmailPropsI extends StandardTextFieldProps, MapStateToPropsI, EmailState {}
