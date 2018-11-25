import * as React from 'react';
import { LessonProps } from './container';

import Comparator from './Comparator/container';
import LessonButtons from './LessonButtons/container';
import Stats from './Stats/container';
import Paper from '@material-ui/core/Paper';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

class LessonComponent extends React.Component<LessonProps> {
    style: React.CSSProperties;
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.props.registerOnDrop(this.onDrop);
    }

    componentWillUnmount() {
        /** no matter if running or not, cheaper than checking */
        this.props.reset();
        this.props.deregisterOnDrop(this.onDrop);
    }

    get invite (): JSX.Element {
        return (
            <p> You can start typing :-) </p>
        );
    }

    onDrop (e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        const { clientX, clientY } = e;
        this.props.onMoveLesonButtons(clientY, clientX);
    }

    render() {
        const { title, ended, started } = this.props;
        const { lessonPaper } = this.props.classes;
        return (
            <Paper className={lessonPaper}>
                <h2>
                    Lesson: "{title? title.toLowerCase() : ' '}"
                </h2>
                {/* Whitespace - leave even empty paragraph */}
                { !started? this.invite : <p style={{whiteSpace: "pre"}}>&nbsp;</p>}
                <Comparator />
                <LessonButtons />
                { ended && <Stats /> }
            </Paper>
        );
    }
}

export default withStyles(styles)(LessonComponent);