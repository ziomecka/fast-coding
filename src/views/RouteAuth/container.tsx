import { default as RouteAuth } from './component';
import { AppRoutesEnum } from '@appTypes';
import { RouteComponentProps } from 'react-router-dom';

export default RouteAuth;

export interface AuthRouteProps extends RouteComponentProps {
    condition: boolean;
    redirect?: AppRoutesEnum;
};
