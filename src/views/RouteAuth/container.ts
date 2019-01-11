import { default as RouteAuth } from './component';
import { AppRoutesEnum } from '@appTypes';
import { RouteProps } from 'react-router-dom';

export default RouteAuth;

export interface AuthRouteProps extends RouteProps {
    condition: boolean;
    redirect?: AppRoutesEnum;
}
