import { AppContainersEnum, MenuContainersEnum } from '@appTypes';
import { ComponentsContainersEnum } from '@componentsTypes';
import { ViewsContainersEnum } from '@viewsTypes';

const { dialog, welcome } = AppContainersEnum;
const { comparator, lesson, lessonStepper } = ComponentsContainersEnum;
const { homeView } = ViewsContainersEnum;
const { languagesMenu, mainMenu, userMenu } = MenuContainersEnum;

export const LISTENERS = new Map( [
    [ dialog, new Map() ],
    // @ts-ignore
    [ comparator, new Map() ],
    // @ts-ignore
    [ lesson, new Map( [] ) ],
    // @ts-ignore
    [ homeView, new Map( [] ) ],
    [ welcome, new Map( [] ) ],
    // @ts-ignore
    [ languagesMenu, new Map( [] ) ],
    // @ts-ignore
    [ mainMenu, new Map( [] ) ],
    // @ts-ignore
    [ userMenu, new Map( [] ) ],
    // @ts-ignore
    [ lessonStepper, new Map( [] ) ]
] );
