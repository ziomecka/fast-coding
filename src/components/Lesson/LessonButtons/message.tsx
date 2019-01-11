import * as React from 'react';
import Info, { InfoEnum } from '@app/Info/';

const { dialog } = InfoEnum;

const Component = () => (
    <Info
        variant={ dialog }
        render={[
            {id: 'lessonDialogLeaveQuestion', variant: 'h2'},
            {id: 'lessonDialogLeaveExplanation', variant: 'body1'}
        ]}
        useLocalize
    />
);

export default Component;
