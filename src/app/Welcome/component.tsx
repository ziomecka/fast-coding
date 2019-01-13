import * as React from 'react';

import { WelcomeProps } from './container';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutesEnum, MenuRulesEnum } from '@appTypes';
import { buttonsIds, WelcomeClasses } from './_duck/';

/** SubMenu */
import MenuButton, { MenuButtonOptionsI } from '@app/MenuButton/';

const { notAnyLesson, notHome } = MenuRulesEnum;

/** Translations */
import { Translate } from 'react-localize-redux';

import { withMedia, MediaEnum } from '@app/Media';
const { xs } = MediaEnum;

import { withLocation, AppLocationEnum } from '@app/LocationHoc/';

require( './style.sass' );

class WelcomeComponent extends React.Component<WelcomeProps> {
    classFalling: string;
    demoUrl: AppRoutesEnum;
    lessonsUrl: AppRoutesEnum;
    button: MenuButtonOptionsI;
    // @ts-ignore
    classes: { [ key: AppLocationEnum ]: WelcomeClasses };
    constructor( props ) {
        super( props );
        this.classFalling = null;

        this.demoUrl = AppRoutesEnum.demo;
        this.lessonsUrl = AppRoutesEnum.lessons;

        this.goToDemo = this.goToDemo.bind( this );
        this.goToLessons = this.goToLessons.bind( this );

        /** Link to Welcome page
         *  Hidden, under title, rendered on not Welcome page
         */
        this.button = {
            appRoute: AppRoutesEnum.home,
            rules: [ notAnyLesson, notHome ],
            icon: <div></div>,
            iconButton: {
                disableRipple: true,
                disableTouchRipple: true,
                classes: { root: this.props.classes.welcomeHomeSubMenu }
            },
            title: 'submenuGoToHome',
        };

        const classTitleHome = 'welcome welcome-home';
        const classTitleOther = 'welcome welcome-other';
        const classTitleFalling = 'title-falling';

        this.classes = {
            [ props.isHome ]: {
                classAnimated: classTitleFalling,
                classTitle: classTitleHome
            },
            [ props.isOther ]: {
                classTitle: classTitleOther,
                classAnimated: '',
            }
        };
    }

    componentDidUpdate( prevProps: WelcomeProps ) {
        const { appLocation } = this.props;

        if ( appLocation !== prevProps.appLocation ) {
            if ( appLocation === this.props.isHome ) {
                this.props.addEventListener();
            } else {
                this.props.removeEventListener();
            }
        }
    }

    async goToDemo () {
        let answer = await this.props.openDemoLesson();
        // @ts-ignore
        if ( answer ) {
            this.props.history.push( this.demoUrl );
        }
        answer = null; //GC
    }

    goToLessons() {
        this.props.history.push( this.lessonsUrl );
    }

    heading = () => {
        const {
            classFalling,
            props: {
                animated, heading,
                classes: { fallingLetters },
                isHome,
                appLocation
            }
        } = this;

        const classFallingLetters = appLocation === isHome
            ? classFalling
            : '';

        if ( animated ) {
            const lastSpace = heading.lastIndexOf( ' ' );
            const lastWord = heading.slice( lastSpace + 1 );
            const remainingHeading = heading.slice( 0, lastSpace + 1 );

            return (
                <React.Fragment>
                    <span>{ remainingHeading }</span>
                    {
                        Array.from( lastWord ).map( ( letter, ind ) => (
                            <span
                                className={ `${ fallingLetters } ${ classFallingLetters }` }
                                key={ `${ind}-${letter}` }
                            >
                                { letter }
                            </span>
                        ) )
                    }
                </React.Fragment>
            );
        }

        return <React.Fragment>{ heading }</React.Fragment>;
    };

    render() {
        const {
            heading,
            props: {
                classes: {
                    welcomePaper, welcomeHome, welcomeOther, welcomeButtons,
                    welcomeButton, welcomeButtonMain, welcomeHeading,
                    welcomeHeadingHome, welcomeHeadingOther, welcomeLesson,
                    welcomeHomeButton
                },
                media,
                appLocation,
                isHome,
                isLesson
            }
        } = this;

        const checkHome = appLocation === isHome;
        const checkLesson = appLocation === isLesson;

        return (
            <Paper className={
                `${ welcomePaper } ${ checkHome
                    ? welcomeHome
                    : checkLesson
                        ? welcomeLesson
                        : welcomeOther
                }`
            }>

                { ( media !== xs || checkHome ) && (
                    <React.Fragment>
                        <Typography
                            variant="h1"
                            className={
                                `${ welcomeHeading } ${ isHome && welcomeHeadingHome } ${ !checkHome && welcomeHeadingOther }`
                            }
                        >
                            { heading() }
                        </Typography>

                        {/* Link to Welcome page. Hidden, under title, rendered on not Welcome page */ }
                        <MenuButton { ...this.button } />
                    </React.Fragment>
                ) }

                { media === xs && (
                    <MenuButton { ...Object.assign( {}, this.button, { icon: <HomeIcon />, iconButton: { ...this.button.iconButton, classes: { root: welcomeHomeButton } } } ) } />
                )}


                {/* Render buttons only when Home */}
                { checkHome && (
                    <div className={ welcomeButtons }>
                        <Button
                            onClick={ this.goToLessons }
                            className={ welcomeButton }
                            id={ buttonsIds[ 0 ] }
                        >
                            <Translate id="welcomeGoToCourses"/>
                        </Button>
                        <Button
                            className={`${ welcomeButton } ${ welcomeButtonMain }`}
                            onClick={ this.goToDemo }
                            id={ buttonsIds[ 1 ] }
                        >
                            <Translate id="welcomeGoToDemo"/>
                        </Button>
                    </div>
                )}
            </Paper>
        );
    }
}

export default withStyles( styles )( withMedia( withLocation( WelcomeComponent ) ) );
