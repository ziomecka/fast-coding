import { AppLocationEnum, AppRoutesEnum } from '@appTypes';

const locations: [( pathname: string )=> boolean, AppLocationEnum][] = [
    [
        ( pathname: string ) => pathname === AppRoutesEnum.home,
        AppLocationEnum.isHome
    ],
    [
        ( pathname: string ) => /\/lessons\/lesson-/.test( pathname ),
        AppLocationEnum.isLesson
    ]
];

export const checkLocation = ( pathname: string ): AppLocationEnum => {
    for ( const location in locations ) {
        if ( locations[location][0]( pathname ) ) {
            return locations[location][1];
        }
    }

    return AppLocationEnum.isOther;
};
