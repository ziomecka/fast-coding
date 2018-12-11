import * as React from 'react';

import { StatsProps } from './container';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { Translate } from 'react-localize-redux';
import withTable from '../../../app/Table';

class StatsComponent extends React.Component<StatsProps> {
    constructor(props: StatsProps) {
        super(props);
    }

    get totalTime() {
        const { start, stop, time } = this.props;
        return Math.round((stop - start + time) / 10) / 100;
    }

    get accuracy() {
        const { allErrors, text } = this.props;
        return Math.round(100 - 100 * (allErrors.length / text.length));
    }

    render() {
        const { classes: { statsPaper }, createTable } = this.props;

        return (
            <Paper className={statsPaper} id="lessonStats">
                <Typography variant="h4">
                    <Translate id="lessonStatsHeading" />
                </Typography>

                {createTable({
                    body: [
                        [ <Translate id="lessonStatsTime" />,  <>{ this.totalTime } <Translate id="lessonStatsTimeUnit" /></>, <></>  ],
                        [ <Translate id="lessonStatsAccuracy" />, <>{ this.accuracy }%</>, <CircularProgress value={this.accuracy} variant="static" /> ]
                    ]
                })}
            </Paper>
        );

    }
};

export default withStyles(styles)(withTable(StatsComponent));
