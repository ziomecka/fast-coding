
import {
    INITIAL_STATE as APP_INITIAL_STATE,
    AppState,
    appReducer,
} from '@app/_reducers/';

import {
    INITIAL_STATE as COMPONENTS_INITIAL_STATE,
    ComponentsState,
    componentsReducer,
} from '@components/_reducers/';

import {
    CSRActionsEnum,
} from '@appTypes';

import {
    LocalizeState,
    localizeReducer,
} from 'react-localize-redux';

import { CSRActions } from '@app/CSR/_duck/actions';
import { INITIAL_STATE as LOCALIZA_INITIAL_STATE } from '@app/Localize/_duck/reducers';
import { ApplicationContainersEnum } from '@applicationTypes';
import { ComponentsActions } from '@components/_actions';
import { Reducer } from 'redux';
import { csrReducer } from '@app/CSR/_duck/reducers';

const { components, app } = ApplicationContainersEnum;

export const INITIAL_STATE = {
    [ components ]: { ...COMPONENTS_INITIAL_STATE },
    [ app ]: { ...APP_INITIAL_STATE },
    localize: { ...LOCALIZA_INITIAL_STATE }
};

const {
    APP_CSR_CHANGE_LOADING_STATE,
    APP_CSR_REPORT_ERROR,
    APP_CSR_UPDATE_DATA
} = CSRActionsEnum;

const reducers: Reducer<ApplicationState> = ( state = INITIAL_STATE, action ): ApplicationState => {
    /** get ^@@.*_$ from type */
    const actionType = action.type.slice( 0, action.type.indexOf( '_' ) );

    switch ( true ) {
        // TODO improve - przeniesc csr poza app
        case action.type === APP_CSR_CHANGE_LOADING_STATE:
        case action.type === APP_CSR_REPORT_ERROR:
        case action.type === APP_CSR_UPDATE_DATA: {
            return {
                ...state,
                ...csrReducer( state, action as CSRActions )
            };
        }

        /** TODO Improve */
        case ( actionType === '@@app' ): {
            return {
                ...state,
                // @ts-ignore
                [ app ]: { ...appReducer( state[ app ], action ) }
            };
        }

        /** TODO Improve */
        case ( actionType === '@@components' ): {
            return {
                ...state,
                // @ts-ignore
                [ components ]: { ...componentsReducer( state[ components ], action as ComponentsActions ) }
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
                // @ts-ignore
                localize: localizeReducer( state.localize, action )
            };
        }
    }
};

export { reducers as applicationReducer };

export interface ApplicationState {
    // @ts-ignore
    [key: ApplicationContainersEnum ]: ComponentsState | AppState;
    localize: LocalizeState;
}
