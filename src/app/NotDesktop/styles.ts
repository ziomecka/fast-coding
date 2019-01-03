import { createStyles } from '@material-ui/core/styles';
import { PAPER_PADDING_MAX_LG, PAPER_PADDING_MAX_MD } from '@constantsStyles';
import { MULTIPLY_ANIMATION } from './constants.styles';

const styles = createStyles( theme => {
    const {
        palette: {
            primary: {
                main: backgroundColor,
                textColor: endColor
            }
        },
        transitions: {
            duration: { complex },
        }
    } = theme;

    return {
        FCPaper: {
            backgroundColor,
            padding: `${ PAPER_PADDING_MAX_MD }`,
            [ theme.breakpoints.up('lg') ]: {
                padding: `${ PAPER_PADDING_MAX_LG }`,
            },
            '& p': {
                animation: `show ${ complex * MULTIPLY_ANIMATION / 1000 }s`,
            }
        },
        '@global': {
            '@keyframes show': {
                '0%': {
                    color: backgroundColor
                },
                '85%': {
                    color: backgroundColor
                },
                '100%': {
                    color: endColor
                }
            }
        }
    };
});

export default styles;