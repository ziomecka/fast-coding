import { RouteProps } from 'react-router-dom';
import { default as RouteAuth } from './component';
import { AppRoutes } from '../../_common/';

export default RouteAuth;

export interface AuthRouteProps extends RouteProps {
    condition: boolean;
    redirect?: AppRoutes;
};
