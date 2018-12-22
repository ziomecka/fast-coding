import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { default as FormHelperText } from './component';
import { ApplicationState } from '@store';

import { FormHelperTextState } from './_duck/reducers';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { formHelperText } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): FormHelperTextState => ({
    ...state[app][formHelperText]
});

const FormHelperTextContainer = connect(mapStateToProps)(FormHelperText);

export default FormHelperTextContainer;

export interface FormHelperTextProps extends FormHelperTextState {};