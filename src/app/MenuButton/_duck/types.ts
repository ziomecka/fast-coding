import { IconButtonProps } from '@material-ui/core/IconButton';

import {
    AppRoutesEnum,
    MenuRulesEnum,
} from '@appTypes';

import { LanguagesEnum } from '@applicationTypes';

export interface MenuButtonOptionsI {
    appRoute?: AppRoutesEnum;
    onClick?: () => void;
    lang?: LanguagesEnum;
    icon: JSX.Element;
    rules?: MenuRulesEnum[];
    iconButton?: IconButtonProps;
    title: string;
};