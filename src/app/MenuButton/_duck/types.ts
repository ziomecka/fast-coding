import { IconButtonProps } from '@material-ui/core/IconButton';

import {
    AppRoutesEnum,
    SubMenuRulesEnum,
    NavRulesEnum,
} from '@appTypes';

import { LanguagesEnum } from '@applicationTypes';

export type MenuButtonItemType = {
    title: string;
    appRoute?: AppRoutesEnum;
    rules: SubMenuRulesEnum[];
    onClick?: () => void;
    lang?: LanguagesEnum;
};

export interface __MenuButtonProps {
    menuItem: MenuButtonItemType;
    icon: JSX.Element;
    rules?: NavRulesEnum[];
    iconButton?: IconButtonProps;
    title: string;
};