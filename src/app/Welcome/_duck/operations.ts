import { WelcomeClasses } from './reducers';
import { AppLocation } from '../../_common/';

const { isHome, isOther } = AppLocation;

export const classTitleHome = 'welcome welcome-home';
export const classTitleOther = 'welcome welcome-other';
export const classTitleFalling = 'title-falling';

const states: {
    // @ts-ignore
    [key: AppLocation]: WelcomeClasses
} = {
    [isHome]: {
        classAnimated: classTitleFalling,
        classTitle: classTitleHome
    },
    [isOther]: {
        classTitle: classTitleOther,
        classAnimated: '',
    }
};

export const getClasses = (location: AppLocation): WelcomeClasses => {
    return states[location] || states[isOther];
};