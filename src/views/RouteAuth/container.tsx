import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';

import { default as RouteAuth } from './component';
import { ApplicationState } from '../../store';

import { ApplicationContainers, AppContainers } from '../../_common/';

const { app } = ApplicationContainers;
const { user } = AppContainers;

const mapStateToProps = (state: ApplicationState): MapStateToPropsI => ({
    authorized: state[app][user].authorized
});

const RouteAuthContainer = connect(mapStateToProps)(RouteAuth);

export default RouteAuthContainer;

interface MapStateToPropsI {
    authorized: boolean;
}

export interface AuthRouteProps extends MapStateToPropsI, RouteProps {};