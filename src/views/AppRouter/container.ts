import { connect } from 'react-redux';

import { default as AppRouter } from './component';
import { ApplicationState } from '@appStore';

import { ApplicationContainersEnum } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainersEnum;
const { user } = AppContainersEnum;

const mapStateToProps = (state: ApplicationState): AppRouterMapStateToProps => ({
    authorized: state[app][user].authorized
});

const Container = connect(mapStateToProps)(AppRouter);

export default Container;

export interface AppRouterMapStateToProps {
    authorized: boolean;
}

export interface AppRouterPropsI extends AppRouterMapStateToProps {}