import { default as Footer } from './component';
import { WithStyles } from '@material-ui/core/styles';
import { ILocationContextProps } from '@app/AppLocation/';

export default Footer;

export interface FooterProps extends
WithStyles,
ILocationContextProps {}
