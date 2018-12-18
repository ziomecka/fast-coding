
import { Dispatch } from 'redux';

import { ApplicationContainers, ThunkGetStateType } from '@applicationTypes';
import { AppContainersEnum } from '@appTypes';

const { app } = ApplicationContainers;
const { user } = AppContainersEnum;
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