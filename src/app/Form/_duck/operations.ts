import { Dispatch, Action } from 'redux';
import { setFormHelperText } from '../../FormHelperText/_duck/actions';

export const onFormInvalid = (): any => (
    async ( dispatch: Dispatch ): Promise<Action> => {
        return dispatch(setFormHelperText('formInvalid'));
    }
);
