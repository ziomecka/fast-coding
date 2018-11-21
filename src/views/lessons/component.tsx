import * as React from 'react';

import { LessonsViewProps } from './container';
import Lessons from '../../components/Lessons';

/** Materials */
import Paper from '@material-ui/core/Paper';

const LessonsViewComponent: React.StatelessComponent<LessonsViewProps> = props => {
    const { loading } = props;

    const loader = (
        <Paper>
            Lessons are loading...
        </Paper>
    );

    if (loading) return loader;
    return <Lessons />;
};

export default LessonsViewComponent;