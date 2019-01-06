import * as React from 'react';
import Info from '@app/Info/';

const Component = () => (
    <Info render={[
        {id: 'lessonDialogLeaveQuestion', variant: 'h2'},
        {id: 'lessonDialogLeaveExplanation', variant: 'body1'}
    ]} useLocalize />
);

export default Component;