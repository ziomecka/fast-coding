import { ContentClasses } from './reducers';
import { AppLocationEnum } from '@appTypes';

export const contentClassHome = 'content-box content-box-home';
export const contentClassOther = 'content-box content-box-other';

const { isHome, isOther } = AppLocationEnum;

// @ts-ignore
const states: { [key: AppLocationEnum]: ContentClasses } = {
    [ isHome ]: {
        contentClass: contentClassHome
    },
    [ isOther ]: {
        contentClass: contentClassOther
    }
};

export const getClasses = ( location: AppLocationEnum ): ContentClasses => {
    return states[ location ] || states[ isOther ];
};

export default {};
