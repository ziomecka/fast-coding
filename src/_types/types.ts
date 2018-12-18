
import { ApplicationState } from '../_reducers/';

export enum ApplicationContainers {
    views = 'VIEWS',
    components = 'COMPONENTS',
    app = 'APP'
};

export type ThunkGetStateType =  () => ApplicationState ;
export { ApplicationState as ApplicationState };