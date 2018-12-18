import { AppLocation } from '@appTypes';
import { AppRoutes } from '@appTypes';

const locations: [(pathname: string)=> boolean, AppLocation][] = [
    [
        (pathname: string) => pathname === AppRoutes.home,
        AppLocation.isHome
    ],
    [
        (pathname: string) => /\/lessons\/lesson-/.test(pathname),
        AppLocation.isLesson
    ]
];

export const checkLocation = (pathname: string): AppLocation => {
    for (const location in locations) {
        if (locations[location][0](pathname)) {
            return locations[location][1];
        }
    }

    return AppLocation.isOther;
};