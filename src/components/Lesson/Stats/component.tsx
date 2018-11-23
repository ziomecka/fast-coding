import * as React from 'react';

import { StatsProps } from './container';

import Paper from '@material-ui/core/Paper';

const StatsComponent:React.StatelessComponent<StatsProps> = (props)  => {
    const { start, stop, endedLesson, allErrors, text } = props;

    return (
        <Paper>
            {
                (endedLesson && start && stop && (stop > start))
                ? (
                    <>
                        <p>{`Time: ${Math.round((stop - start) / 10) / 100} seconds.`}</p>
                        <p>{`Accuracy: ${Math.round(100 - 100 * (allErrors.length / text.length))}%`}</p>
                    </>
                )
                : null
            }
        </Paper>
    );
};

export default StatsComponent;
