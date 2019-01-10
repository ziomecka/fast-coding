import { createStyles } from '@material-ui/core/styles';
import { LESSON_MAX_WIDTH } from '@constantsStyles';

const styles = createStyles( theme => {
    const {
        palette: {
            primary: { main: borderColor }
        }
    } = theme;

    return {
        statsPaper: {
            minWidth: 'auto',
            minHeight: 'auto',
            maxWidth: `${LESSON_MAX_WIDTH}px`,
            height: 'auto',
            width: '100%',
            position: 'relative',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: '3rem',
            margin: '1rem 0',
            border: `.5px solid ${borderColor}`
        },
        statsNote: {
            '&:after': {
                content: '\':\''
            }
        }
    };
} );

export default styles;