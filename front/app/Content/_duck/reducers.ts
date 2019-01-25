import { Reducer } from 'redux';
import { ContentActionsEnum } from './types';

const {
    APP_CONTENT_ONDROP_REGISTER,
    APP_CONTENT_ONDROP_DEREGISTER
} = ContentActionsEnum;

export const INITIAL_STATE: ContentState = {
    onDrop: []
};

const reducer: Reducer<ContentState> = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case APP_CONTENT_ONDROP_REGISTER: {
            return {
                ...state,
                onDrop: [ ...state.onDrop, action.onDrop ]
            };
        }

        // TODO improve, GC
        case APP_CONTENT_ONDROP_DEREGISTER: {
            const index = state.onDrop.findIndex( item => item === action.onDrop );
            const temp = [ ...state.onDrop ];
            temp.splice( index, 1 );
            return {
                ...state,
                onDrop: [ ...temp ]
            };
        }

        default: {
            return { ...state };
        }
    }
};

export { reducer as contentReducer };

export interface ContentState {
    onDrop: Array<( e: React.DragEvent<HTMLElement> )=> void>;
}
