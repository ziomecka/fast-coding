import * as React from 'react';
import { LessonProps } from './container';

import Comparator from './Comparator/container';
import LessonButtons from './LessonButtons/container';
import Stats from './Stats/container';
import Paper from '@material-ui/core/Paper';

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

        return (
            <>
                <Paper>
                    <h2>
                        Lesson: "{title? title.toLowerCase() : ' '}"
                    </h2>
                    {/* Whitespace - leave even empty paragraph */}
                    { !started? this.invite : <p style={{whiteSpace: "pre"}}>&nbsp;</p>}
                    <Comparator />
                    { ended && <Stats /> }
                <LessonButtons />
                </Paper>
            </>
        );
    }
}

export default LessonComponent;