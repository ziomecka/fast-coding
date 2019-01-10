import { createStyles } from '@material-ui/core/styles';
import {
    PAPER_PADDING_MAX_LG,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_MAX_XS,
    NAV_HEIGHT_MD,
    NAV_HEIGHT_LG
} from '@constantsStyles';
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
            padding: `${ PAPER_PADDING_MAX_XS }`,
            paddingTop:NAV_HEIGHT_MD,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            [ theme.breakpoints.up('sm') ]: {
                padding: `${ PAPER_PADDING_MAX_MD }`,
            },
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