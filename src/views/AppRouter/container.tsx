import { connect } from 'react-redux';

import { default as AppRouter } from './component';
import { ApplicationState } from '../../store';

import { ApplicationContainers } from '@applicationTypes';
import { AppContainers } from '@appTypes';

const { app } = ApplicationContainers;
const { user } = AppContainers;

const mapStateToProps = (state: ApplicationState): AppRouterMapStateToProps => ({
    authorized: state[app][user].authorized
});

const Container = connect(mapStateToProps)(AppRouter);

export default Container;

export interface AppRouterMapStateToProps {
    authorized: boolean;
};

export interface AppRouterPropsI extends AppRouterMapStateToProps {};