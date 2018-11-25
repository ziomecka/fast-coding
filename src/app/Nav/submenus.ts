import { AppRoutes } from '../../_common/';

const { home, lessons, about, login, newuser } = AppRoutes;

export const homeMenuItem = ['Home', home];

export const mainMenuItems = [
    ['Lessons', lessons],
    ['About', about]
];

export const userMenuItems = [
    ['Login', login],
    ['Newuser', newuser]
];

