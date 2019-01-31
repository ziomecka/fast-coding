import { connect } from 'react-redux';

import { default as AppRouter } from './component';
import { ApplicationState } from '@appStore';

import { IWithMedia } from '@app/Media/';

import { DialogDispatch, mapDispatchToProps } from '@shared/dialog';

const mapStateToProps = ( state: ApplicationState ): AppRouterMapStateToProps => ( {
    authorized: state.app.user.authorized
} );

const Container = connect( mapStateToProps, mapDispatchToProps )( AppRouter );

export default Container;

export interface AppRouterMapStateToProps {
    authorized: boolean;
}

export interface AppRouterPropsI extends
AppRouterMapStateToProps,
IWithMedia,
DialogDispatch {}
