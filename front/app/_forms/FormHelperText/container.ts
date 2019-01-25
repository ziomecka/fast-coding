import { connect } from 'react-redux';

import { default as FormHelperText } from './component';
import { ApplicationState } from '@appStore';

import { FormHelperTextState } from './_duck/reducers';

const mapStateToProps = ( state: ApplicationState ): FormHelperTextState => ( {
    ...state.app.formHelperText
} );

const FormHelperTextContainer = connect( mapStateToProps )( FormHelperText );

export default FormHelperTextContainer;

export interface FormHelperTextProps extends FormHelperTextState {}
