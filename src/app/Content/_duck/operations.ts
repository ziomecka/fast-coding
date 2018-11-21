import { ContentClasses } from './reducers';
import { AppLocation } from '../../_common/';

export const contentClassHome = 'content-box content-box-home';
export const contentClassOther = 'content-box content-box-other';

const { isHome, isOther } = AppLocation;

const states: {
    // @ts-ignore
    [key: AppLocation]: ContentClasses
} = {
    [isHome]: {
        contentClass: contentClassHome
    },
    [isOther]: {
        contentClass: contentClassOther
    }
};

export const getClasses = (location: AppLocation): ContentClasses => {
    return states[location] || states[isOther];
};

export default {};
