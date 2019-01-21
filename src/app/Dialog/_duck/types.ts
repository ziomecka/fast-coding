// http://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
import { Action } from 'redux';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

export enum DialogActionsEnum {
    APP_DIALOG_OPEN = '@@app_dialog/OPEN',
    APP_DIALOG_CLOSE = '@@app_dialog/CLOSE'
}

interface AppButtonProps extends ButtonProps {
    onClick: ( e?: React.MouseEvent<HTMLButtonElement> ) => Promise< Action | number | void >;
}

export interface DialogButtonsProps extends ButtonProps {
    buttonProps: AppButtonProps;
    translationId: string;
    aftertext?: string;
    key?: string
}

type ExcludeOpenProp<K> = K extends 'open' ? never : K;

type AppDialogProps = { [ K in ExcludeOpenProp<keyof DialogProps>]?: DialogProps[K] };

type DialogContentVariants =
    {
        variant: 'COMPONENT',
        Component: React.ComponentClass | React.FunctionComponent
    }
| {
        variant: 'HTML',
        html: JSX.Element
    };

type ExcludeVariant<T> = T extends 'variant' ? never : T;

type ExcludeVariantField<T> = {
    [K in ExcludeVariant<keyof T> ]: T[K]
};

type ExtractOptions<D, V> = D extends {variant: V} ? D : never;

type DialogCommonOptions = {
    dialogProps?: AppDialogProps;
    titleId?: string;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
};

type DialogComponentOptions =
ExcludeVariantField<ExtractOptions<DialogContentVariants, 'COMPONENT'>> &
DialogCommonOptions;

type DialogHTMLOptions =
ExcludeVariantField<ExtractOptions<DialogContentVariants, 'HTML'>> &
DialogCommonOptions;

interface Buttons {
    [key: string]: DialogButtonsProps
}

interface YesButton extends Buttons {
    buttonYes?: DialogButtonsProps;
}

interface YesCancelButtons extends YesButton {
    buttonCancel?: DialogButtonsProps;
}

export type DialogVariant = DialogContentVariants['variant'];

export type SimpleDialogOptions = ( DialogComponentOptions | DialogHTMLOptions );

export type YesDialogOptions = ( DialogComponentOptions | DialogHTMLOptions ) & {
    buttons?: YesButton;
};

export type YesCancelDialogOptions = ( DialogComponentOptions | DialogHTMLOptions ) & {
    buttons?: YesCancelButtons;
};


export enum DialogsEnum {
    simple = 'SIMPLE',
    yes = 'YES',
    yesCancel = 'YES_CANCEL'
}

export type OpenDialogOptions = (
    YesDialogOptions & { variant: DialogsEnum.yes }
) | (
    YesCancelDialogOptions & { variant: DialogsEnum.yesCancel }
) | (
    SimpleDialogOptions & { variant: DialogsEnum.simple }
);
