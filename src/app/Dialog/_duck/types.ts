import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

export enum DialogActionsEnum {
    APP_DIALOG_OPEN = '@@app_dialog/OPEN',
    APP_DIALOG_CLOSE = '@@app_dialog/CLOSE'
}

interface DialogButtonsProps {
    title: string,
    buttonProps: ButtonProps;
    translationId: string;
    aftertext?: string;
    key?: string
}

export interface AppDialogOptions {
    messageId: string;
    titleId: string;
    buttons: Array<DialogButtonsProps>;
    dialogProps: DialogProps;
};

export interface DialogOptions extends AppDialogOptions {
    onClose: () => void;
    onEnter?: () => void;
    onBackdropClick?: () => void;
    onExited?: () => void;
    onKeydown?: () => void;
};

export interface DialogState extends AppDialogOptions {};