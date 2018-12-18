import * as React from 'react';

import { WelcomeProps } from './container';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutesEnum } from '@appTypes';
import { buttonsIds } from './_duck/operations';

/** SubMenu */
import  SubMenu from '../SubMenu/';
import  { __SubMenuProps } from '../SubMenu/container';
import { NavRulesEnum, SubMenuRulesEnum } from '@appTypes';

const { notAnyLesson, notHome } = NavRulesEnum;
const { notCurrentLocation } = SubMenuRulesEnum;

/** Translations */
import { Translate } from 'react-localize-redux';

require('./style.sass');

class WelcomeComponent extends React.Component<WelcomeProps> {
    classFalling: string;
    demoUrl: AppRoutesEnum;
    lessonsUrl: AppRoutesEnum;
    home: AppRoutesEnum;
    subMenu: __SubMenuProps;
    constructor(props) {
        super(props);
        this.classFalling = 'title-falling';

        this.demoUrl = AppRoutesEnum.demo;
        this.home = AppRoutesEnum.home;
        this.lessonsUrl = AppRoutesEnum.lessons;

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
            },
            title: 'submenuGoToHome'
        };
    }

    componentDidUpdate(prevProps: WelcomeProps) {
        const { appLocation } = this.props;
        const prevAppLocation = prevProps.appLocation;

        if (appLocation !== prevAppLocation) {
            this.props.changeLocation(appLocation);
            if ( this.isHome ) {
                this.props.addEventListener();
            } else {
                this.props.removeEventListener();
            }
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

    get isLesson() {
        return RegExp(/.*lessons\/lesson-.*/).test(this.props.location.pathname);
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
                                className={`${fallingLetters} ${this.isHome ? classFalling : ''}`}
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
        const {
            heading,
            isHome,
            isLesson,
            props: {
                classes: {
                    welcomePaper,
                    welcomeHome,
                    welcomeOther,
                    welcomeButtons,
                    welcomeButton,
                    welcomeButtonMain,
                    welcomeHeading,
                    welcomeHeadingOther,
                    welcomeLesson
                }
            }
        } = this;

        return (
            <Paper className={
                `${welcomePaper} ${
                    isHome
                    ? welcomeHome
                    : isLesson
                        ? welcomeLesson
                        : welcomeOther
                    }`
            }>
                <Typography variant="h1" className={`${welcomeHeading} ${!isHome && welcomeHeadingOther}`}>
                    {heading()}
                </Typography>

                { /* Renders the link to home
                  /* Only on specific paths
                  */}
                <SubMenu {...this.subMenu} />

                {/* Render buttons only when Home */}
                {isHome && (
                    <div className={ welcomeButtons }>
                        <Button
                            onClick={this.goToLessons}
                            className={welcomeButton}
                            id={buttonsIds[0]}
                        >
                            <Translate id="welcomeGoToCourses"/>
                        </Button>
                        <Button
                            className={`${welcomeButton} ${welcomeButtonMain}`}
                            onClick={this.goToDemo}
                            id={buttonsIds[1]}
                        >
                            <Translate id="welcomeGoToDemo"/>
                        </Button>
                    </div>
                )}
            </Paper>
        );
    }
};

export default withStyles(styles)(WelcomeComponent);