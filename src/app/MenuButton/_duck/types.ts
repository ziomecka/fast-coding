import { IconButtonProps } from '@material-ui/core/IconButton';

import {
    AppRoutesEnum,
    MenuRulesEnum,
} from '@appTypes';

import { LanguagesEnum } from '@applicationTypes';

export type MenuButtonItemType = {
    title: string;
    appRoute?: AppRoutesEnum;
    rules: MenuRulesEnum[];
    onClick?: () => void;
    lang?: LanguagesEnum;
};

export interface __MenuButtonProps {
    menuItem: MenuButtonItemType;
    icon: JSX.Element;
    rules?: MenuRulesEnum[];
    iconButton?: IconButtonProps;
    title: string;
};