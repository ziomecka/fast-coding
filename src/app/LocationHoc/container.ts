import { withRouter, RouteComponentProps } from 'react-router-dom';

import { default as LocationProvider } from './component';

const LocationProviderContainer = withRouter( LocationProvider );

export default LocationProviderContainer;

export interface ILocationProviderProps extends RouteComponentProps<{}> {}
