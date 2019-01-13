import { default as WelcomeHeading } from './component';

import { WithStyles } from '@material-ui/core/styles';

import { IWithMedia } from '@app/Media/';
import { ILocationContextProps } from '@app/LocationHoc/';

const WelcomeHeadingContainer = WelcomeHeading;

export default WelcomeHeadingContainer;

export interface WelcomeHeadingProps extends
    WithStyles,
    IWithMedia,
    ILocationContextProps {
        heading: string;
        animated: boolean;
        timeout: number;
    }
