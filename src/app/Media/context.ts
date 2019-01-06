import * as React from 'react';
import { MediaEnum } from './_duck';

export interface IWithMedia {
    media: MediaEnum;
}

const defaultValue: IWithMedia = { media: null };

const context = React.createContext(defaultValue);

export default context;