import { createStyles } from '@material-ui/core/styles';
import {
    PAPER_PADDING_XS,
    PAPER_PADDING_MAX_XS,
    PAPER_PADDING_MD,
    PAPER_PADDING_MAX_MD,
    PAPER_PADDING_LG,
    PAPER_PADDING_MAX_LG,
    BORDER_THIN,
} from '@constantsStyles';

const styles = createStyles( theme => {
    const {
        palette: {
            primary: { main: borderColor }
        }
    } = theme;

    return {
        buttonClass: {
            maxWidth: `calc( 50% + 2rem)`
        },
        menuClass: {
            minWidth: 'auto',
            minHeight: 'auto',
            height: 'auto',
            width: '100%',
            position: 'relative',
            justifyContent: 'center',
            padding: PAPER_PADDING_XS,
            marginTop: PAPER_PADDING_MAX_XS,
            [ theme.breakpoints.up( 'sm' ) ]: {
                padding: PAPER_PADDING_MD,
                marginTop: PAPER_PADDING_MAX_MD,
            },
            [ theme.breakpoints.up( 'lg' ) ]: {
                padding: PAPER_PADDING_LG,
                marginTop: PAPER_PADDING_MAX_LG,
            },
            border: `${BORDER_THIN} solid ${borderColor}`
        },
        menuDraggedClass: {
            position: 'absolute'
        },
        dragHandleClass: {
            position: 'absolute',
            top: '.1em',
            left: '.1em',
            color: theme.palette.primary.light,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
        }
    };
} );

export default styles;
