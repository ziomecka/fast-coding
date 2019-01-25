
import { default as ButtonWithHint } from './component';
import { WithStyles } from '@material-ui/core/styles';

import { ButtonProps } from '@material-ui/core/Button';

const ButtonWithHintContainer = ButtonWithHint;

export default ButtonWithHintContainer;

export interface ButtonWithHintProps extends WithStyles {
    translationId?: string;
    buttonProps: ButtonProps;
    aftertext?: string;
}
