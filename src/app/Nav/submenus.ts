import { AppRoutes, SubMenuRulesEnum } from '../../_common/';
import { SubMenuItemType } from '../SubMenu/container';

const { home, lessons, about, login, newuser } = AppRoutes;
const { onlyAuthorized, onlyUnauthorized, notCurrentLocation} = SubMenuRulesEnum;

export const homeMenuItem: SubMenuItemType = [ 'Home', home, [ notCurrentLocation,  ]];

export const mainMenuItems: SubMenuItemType[] = [
    [ 'Lessons', lessons, [ notCurrentLocation ] ],
    [ 'About', about, [ notCurrentLocation ] ]
];

export const userMenuItems: SubMenuItemType[] = [
    [ 'Login', login, [ onlyUnauthorized, notCurrentLocation,  ] ],
    [ 'Newuser', newuser, [ onlyUnauthorized, notCurrentLocation,  ] ]
];