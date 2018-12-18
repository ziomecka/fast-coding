
import { ApplicationState } from '../_reducers/';

export enum ApplicationContainersEnum {
    views = 'VIEWS',
    components = 'COMPONENTS',
    app = 'APP'
};

export type ThunkGetStateType =  () => ApplicationState ;
export { ApplicationState as ApplicationState };