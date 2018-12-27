import { createStyles } from '@material-ui/core/styles';

import menuIconClass from '../AppMenu/menu.icon.class';

const style = createStyles(theme => {
    return {
        ...menuIconClass(theme)
    };
});

export default style;