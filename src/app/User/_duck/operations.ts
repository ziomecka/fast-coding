
import { Dispatch } from 'redux';

import { ApplicationContainers, AppContainers, ThunkGetStateType } from '../../../_common';

const { app } = ApplicationContainers;
const { user } = AppContainers;
import { onLoadLessons } from '../../../components/LessonsLoader/_duck/operations';

export const onAuthorize = (): any => async (dispatch: Dispatch, getState: ThunkGetStateType ) => {
    let answer = await true;

    if (answer) {
        const { subscriptionPlan } = getState()[app][user];
        dispatch(onLoadLessons( subscriptionPlan ));
    }
};

export const onUnauthorize = (): any => {

};

export default  {
    onAuthorize,
    onUnauthorize
};