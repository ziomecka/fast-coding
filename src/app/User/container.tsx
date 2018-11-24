import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { default as User } from './component';

import { onAuthorize, onUnauthorize } from './_duck/operations';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch): UserDispatch => ({
    authorize: () => dispatch(onAuthorize()),
    unauthorize: () => dispatch(onUnauthorize())
});

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;

export interface UserDispatch {
    authorize: () => void;
    unauthorize: () => void;
}

export interface UserProps extends UserDispatch {};