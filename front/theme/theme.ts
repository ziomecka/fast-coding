import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import other from './other';
import palette from './palette';

// @ts-ignore
export default createMuiTheme( { ...palette, ...other } );
