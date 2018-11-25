import * as React from 'react';

import { WelcomeProps } from './container';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutes } from '../../_common/';

require('./style.sass');

class WelcomeComponent extends React.Component<WelcomeProps> {
    classFalling: string;
    demoUrl: string;
    home: string;
    constructor(props) {
        super(props);
        this.classFalling = 'title-falling';
        this.onClick = this.onClick.bind(this);
        this.demoUrl = AppRoutes.demo;
        this.home = AppRoutes.home;
    }

    componentDidUpdate(prevProps: WelcomeProps) {
        const { appLocation } = this.props;
        const prevAppLocation = prevProps.appLocation;

        if (appLocation !== prevAppLocation) {
            this.props.changeLocation(appLocation);
        }
    }

    async onClick () {
        let answer = await this.props.openDemoLesson();
        // @ts-ignore
        if (answer) {
            this.props.history.push(this.demoUrl);
        }
        answer = null; //GC
    }

    heading = () => {
        const { animated, heading, classes } = this.props;
        const { classFalling } = this;
        const { fallingLetters } = classes;

        if (animated) {
            const lastSpace = heading.lastIndexOf(' ');
            const lastWord = heading.slice(lastSpace);
            const remainingHeading = heading.slice(0, lastSpace);

            return (
                <>
                    {remainingHeading} {
                        Array.from(lastWord).map((letter, ind) => (
                            <span
                                className={`${fallingLetters} ${classFalling}`}
                                key={`${ind}-${letter}`}
                            >
                                {letter}
                            </span>
                        ))
                    }
                </>
            );
        }

        return <>{heading}</>;
    };

    render()  {
        const { classes, location } = this.props;
        const { heading, home } = this;
        const isHome = location.pathname === home;
        const {
            welcomePaper,
            welcomeHome,
            welcomeOther,
            welcomeButton
        } = classes;

        return (
            <Paper className={
                `${welcomePaper} ${isHome ? welcomeHome : welcomeOther}`
            }>
                <h1>{heading()}</h1>
                    {isHome && (
                        <Button
                            className={welcomeButton}
                            onClick={this.onClick}
                        >
                            Start typing
                        </Button>
                    )}
            </Paper>
        );
    }
};

export default withStyles(styles)(WelcomeComponent);