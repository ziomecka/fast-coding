import * as React from 'react';

import { WelcomeProps } from './container';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutes } from '../../_common/';
import { buttonsIds } from '../../views/home/_duck/operations';

/** SubMenu */
import  SubMenu from '../SubMenu/';
import  { __SubMenuProps } from '../SubMenu/container';
import { NavRulesEnum, SubMenuRulesEnum } from '../../_common/';

const { notAnyLesson, notHome } = NavRulesEnum;
const { notCurrentLocation } = SubMenuRulesEnum;

require('./style.sass');

class WelcomeComponent extends React.Component<WelcomeProps> {
    classFalling: string;
    demoUrl: AppRoutes;
    lessonsUrl: AppRoutes;
    home: AppRoutes;
    subMenu: __SubMenuProps;
    constructor(props) {
        super(props);
        this.classFalling = 'title-falling';

        this.demoUrl = AppRoutes.demo;
        this.home = AppRoutes.home;
        this.lessonsUrl = AppRoutes.lessons;

        this.goToDemo = this.goToDemo.bind(this);
        this.goToLessons = this.goToLessons.bind(this);

        this.subMenu = {
            menuItem: {
                title: 'Home',
                appRoute: this.home,
                rules: [ notCurrentLocation ]
            },
            icon: <div></div>,
            rules: [ notAnyLesson, notHome ],
            iconButton: {
                disableRipple: true,
                disableTouchRipple: true,
                classes: { root: this.props.classes.welcomeHomeSubMenu }
            }
        };
    }

    componentDidUpdate(prevProps: WelcomeProps) {
        const { appLocation } = this.props;
        const prevAppLocation = prevProps.appLocation;

        if (appLocation !== prevAppLocation) {
            this.props.changeLocation(appLocation);
        }
    }

    async goToDemo () {
        let answer = await this.props.openDemoLesson();
        // @ts-ignore
        if (answer) {
            this.props.history.push(this.demoUrl);
        }
        answer = null; //GC
    }

    goToLessons() {
        this.props.history.push(this.lessonsUrl);
    }

    get isHome() {
        return this.props.location.pathname === this.home;
    }

    heading = () => {
        const { animated, heading, classes } = this.props;
        const { classFalling } = this;
        const { fallingLetters, welcomeHeadingWrapper } = classes;

        if (animated) {
            const lastSpace = heading.lastIndexOf(' ');
            const lastWord = heading.slice(lastSpace);
            const remainingHeading = heading.slice(0, lastSpace);

            return (
                <div className={welcomeHeadingWrapper}>
                    {/* Renders the link to home
                     /* Only on specific paths
                     */}
                    <SubMenu {...this.subMenu} />

                    {remainingHeading} {
                        Array.from(lastWord).map((letter, ind) => (
                            <span
                                className={`${fallingLetters} ${this.isHome ? classFalling : ''}`}
                                key={`${ind}-${letter}`}
                            >
                                {letter}
                            </span>
                        ))
                    }
                </div>
            );
        }

        return <>{heading}</>;
    };

    render()  {
        const { classes } = this.props;
        const { heading, isHome } = this;
        const {
            welcomePaper,
            welcomeHome,
            welcomeOther,
            welcomeButtons,
            welcomeButton,
            welcomeButtonMain,
            lessonsButton,
            welcomeHeading,
            welcomeHeadingOther
        } = classes;

        return (
            <Paper className={
                `${welcomePaper} ${isHome ? welcomeHome : welcomeOther}`
            }>
                <Typography variant="h1" className={`${welcomeHeading} ${!isHome && welcomeHeadingOther}`}>
                    {heading()}
                </Typography>

                {/* Render buttons only when Home */}
                {isHome && (
                    <div className={welcomeButtons}>
                        <Button
                            onClick={this.goToLessons}
                            className={welcomeButton}
                            id={buttonsIds[0]}
                        >
                            See lessons
                        </Button>
                        <Button
                            className={`${welcomeButton} ${welcomeButtonMain}`}
                            onClick={this.goToDemo}
                            id={buttonsIds[1]}
                        >
                            Start typing
                        </Button>
                    </div>
                )}
            </Paper>
        );
    }
};

export default withStyles(styles)(WelcomeComponent);