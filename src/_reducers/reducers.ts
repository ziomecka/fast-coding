import { Reducer } from 'redux';

/** VIEWS */
// import { INITIAL_STATE as VIEWS_INITIAL_STATE, ViewsState, viewsReducer } from '../views/_reducers/';
import { actions as viewsActions, ViewsActions } from '../views/_actions';

/** COMPONENTS */
import { INITIAL_STATE as COMPONENTS_INITIAL_STATE, ComponentsState, componentsReducer } from '../components/_reducers/';
import { actions as componentsActions, ComponentsActions } from '../components/_actions';

/** LOCATION CHANGE */
import { locationChangeReducer } from '../app/LocationChange/_duck/reducers';
import { LocationChangeTypes } from '../app/LocationChange/_duck/types';
import { LocationChangeActions } from '../app/LocationChange/_duck/actions';

/** CSR */
import { csrReducer } from '../app/CSR/_duck/reducers';
import { CSRTypes } from '../app/CSR/_duck/types';
import { CSRActions } from '../app/CSR/_duck/actions';

import { INITIAL_STATE as APP_INITIAL_STATE, appReducer, AppState } from '../app/_reducers/';

// import { actions as appActions, AppActions } from '../app/_actions';

import { ApplicationContainers } from '../_common/';

const { views, components, app } = ApplicationContainers;

const INITIAL_STATE = {
    // [views]: { ...VIEWS_INITIAL_STATE },
    [components]: { ...COMPONENTS_INITIAL_STATE },
    [app]: { ...APP_INITIAL_STATE }
};

const { APP_LOCATION_CHANGE_CHANGE_LOCATION } = LocationChangeTypes;
const {
    APP_CSR_CHANGE_LOADING_STATE,
    APP_CSR_REPORT_ERROR,
    APP_CSR_UPDATE_DATA
} = CSRTypes;

const reducers: Reducer<ApplicationState> = (state = INITIAL_STATE, action): ApplicationState => {
    /** get ^@@.*_$ from type */
    const actionType = action.type.slice(0, action.type.indexOf('_'));

    switch (true) {
        // TODO improve - przeniesc loacationChange poza app
        case (action.type === APP_LOCATION_CHANGE_CHANGE_LOCATION): {
            return {
                ...state,
                ...locationChangeReducer(state, action as LocationChangeActions),
            };
        }

        // TODO improve - przeniesc csr poza app
        case action.type === APP_CSR_CHANGE_LOADING_STATE:
        case action.type === APP_CSR_REPORT_ERROR:
        case action.type === APP_CSR_UPDATE_DATA: {
            return {
                ...state,
                ...csrReducer(state, action as CSRActions)
            };
        }

        /** TODO Improve */
        case (actionType === '@@app'): {
            return {
                ...state,
                [app]: { ...appReducer(state[app], action) }
            };
        }

        /** TODO Improve */
        case (actionType === '@@components'): {
            return {
                ...state,
                [components]: { ...componentsReducer(state[components], action as ComponentsActions) }
            };
        }

        // case actionType === '@@views': {
        //     return {
        //         ...state,
        //         [views]: { ...viewsReducer(state[views], action as ViewsActions) },
        //     };
        // }

        default: {
            return {
                ...state,
            };
        }
    }
};

export { reducers as applicationReducer };

export interface ApplicationState {
    // @ts-ignore
    [key: ApplicationContainers ]: ComponentsState | AppState;
};

