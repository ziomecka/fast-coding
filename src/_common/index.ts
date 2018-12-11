import { ApplicationState } from '../_reducers/';

export * from '../app/_common';
export * from '../components/_common';
export * from '../views/_common';

export enum ApplicationContainers {
    views = 'VIEWS',
    components = 'COMPONENTS',
    app = 'APP'
};

export type ThunkGetStateType =  () => ApplicationState ;