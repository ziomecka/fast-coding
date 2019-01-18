import { AppContainersEnum, MenuContainersEnum } from '@appTypes';
import { CoursesContainersEnum, LessonContainersEnum } from '@applicationTypes';
import { ViewsContainersEnum } from '@viewsTypes';

import { KeyboardListenerListenersType } from './types';

const { dialog, welcome } = AppContainersEnum;
const { coursesStepper } = CoursesContainersEnum;
const { lessonComparator, lessonComponent } = LessonContainersEnum;
const { homeView } = ViewsContainersEnum;
const { languagesMenu, mainMenu, userMenu } = MenuContainersEnum;

/** TODO
 * Consider flattening the structure: new Map(), id stored in closure -> 'let i = 0',
 * However, then removeAllListeners will not work,
 * unless a new structure for storing ids of particular component is created
 *  */
export const LISTENERS: KeyboardListenerListenersType = new Map( [
    [ dialog, [ new Map(), 0 ] ],
    // @ts-ignore
    [ lessonComparator, [ new Map(), 0 ] ],
    // @ts-ignore
    [ lessonComponent, [ new Map(), 0 ] ],
    // @ts-ignore
    [ homeView, [ new Map(), 0 ] ],
    [ welcome, [ new Map(), 0 ] ],
    // @ts-ignore
    [ languagesMenu, [ new Map(), 0 ] ],
    // @ts-ignore
    [ mainMenu, [ new Map(), 0 ] ],
    // @ts-ignore
    [ userMenu, [ new Map(), 0 ] ],
    // @ts-ignore
    [ coursesStepper, [ new Map(), 0 ] ]
] );
