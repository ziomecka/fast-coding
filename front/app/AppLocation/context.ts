import * as React from 'react';
import { AppLocationEnum } from './_duck/';

const locationDefaultValue = AppLocationEnum.isHome;

const locationContext = React.createContext( locationDefaultValue );

export default locationContext;

const { Provider, Consumer } = locationContext;

export { Provider, Consumer };
