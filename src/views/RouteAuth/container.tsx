import { RouteProps } from 'react-router-dom';
import { default as RouteAuth } from './component';
import { AppRoutes } from '@appTypes';;

export default RouteAuth;

export interface AuthRouteProps extends RouteProps {
    condition: boolean;
    redirect?: AppRoutes;
};
