export enum AppLocationEnum {
    isHome = 'IS_HOME',
    isLesson = 'IS_LESSON',
    isOther = 'IS_OTHER'
}

export interface ILocationProviderState {
    appLocation: AppLocationEnum;
}

export interface ILocationContextProps {
    isHome: AppLocationEnum;
    isLesson: AppLocationEnum;
    isOther: AppLocationEnum;
    appLocation: AppLocationEnum;
}
