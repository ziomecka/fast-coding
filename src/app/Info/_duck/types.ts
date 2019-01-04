
import * as React from 'react';
import { TypographyClassKey } from '@material-ui/core/Typography';

interface IRenderInfo {
    id: string;
    variant?: TypographyClassKey;
    component?: React.ComponentClass | React.FunctionComponent;
}

export type RenderType = IRenderInfo [];

export default RenderType;