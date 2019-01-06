import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as PrivacyPolicyButton } from './component';
import { OpenDialogOptions } from '@app/Dialog';
import {
    mapDispatchToProps as dialogMapDispatchToProps,
    DialogDispatch
} from '@shared/dialog';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch): PrivacyPolicyButtonDispatch => ({
    ...dialogMapDispatchToProps(dispatch)
});

const PrivacyPolicyButtonContainer =
    connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyButton);

export default PrivacyPolicyButtonContainer;

export interface PrivacyPolicyButtonDispatch extends DialogDispatch {};

export interface PrivacyPolicyButtonProps extends PrivacyPolicyButtonDispatch {
    translationId: string;
    options: OpenDialogOptions;
};