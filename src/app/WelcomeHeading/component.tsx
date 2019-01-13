import * as React from 'react';

import { WelcomeHeadingProps } from './container';

/** Materials core */
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutesEnum, MenuRulesEnum } from '@appTypes';
import { WelcomeHeadingClasses } from './_duck/';

/** SubMenu */
import MenuButton, { MenuButtonOptionsI } from '@app/MenuButton/';

const { notAnyLesson, notHome } = MenuRulesEnum;

import { withMedia, MediaEnum } from '@app/Media';
const { xs } = MediaEnum;

import { withLocation, AppLocationEnum } from '@app/LocationHoc/';

require( './style.sass' );

class WelcomeHeadingComponent extends React.Component<WelcomeHeadingProps> {
    classFalling: string;
    button: MenuButtonOptionsI;
    // @ts-ignore
    classes: { [ key: AppLocationEnum ]: WelcomeHeadingClasses };
    constructor( props ) {
        super( props );
        this.classFalling = null;

        /** Link to WelcomeHeading page
         *  Hidden, under title, rendered on not WelcomeHeading page
         */
        this.button = {
            appRoute: AppRoutesEnum.home,
            rules: [ notAnyLesson, notHome ],
            icon: <div></div>,
            iconButton: {
                disableRipple: true,
                disableTouchRipple: true,
                classes: { root: this.props.classes.welcomeHeadingHomeSubMenu }
            },
            title: 'submenuGoToHome',
        };

        const classTitleHome = 'welcomeHeading welcomeHeading-home';
        const classTitleOther = 'welcomeHeading welcomeHeading-other';
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


    render() {
        const {
            props: {
                animated, heading,
                classes: {
                    headingClass,
                    headingHomeClass, headingOtherClass,
                    welcomeHeadingHomeButton,
                    headingFallingLettersClass
                },
                media,
                appLocation,
                isHome,
            },
            classFalling
        } = this;

        const checkHome = appLocation === isHome;
        const lastSpace = heading.lastIndexOf( ' ' );
        const lastWord = heading.slice( lastSpace + 1 );
        const remainingHeading = heading.slice( 0, lastSpace + 1 );
        const classFallingLetters = appLocation === isHome
            ? classFalling
            : '';

        return (
            <React.Fragment>
                { ( media !== xs || checkHome ) && (
                    <React.Fragment>
                        <Typography
                            variant="h1"
                            className={
                                `${ headingClass } ${ isHome && headingHomeClass } ${ !checkHome && headingOtherClass }`
                            }
                        >
                            <span>{ remainingHeading }</span>
                            {
                                Array.from( lastWord ).map( ( letter, ind ) => (
                                    <span
                                        className={ `${ headingFallingLettersClass } ${ classFallingLetters }` }
                                        key={ `${ ind }-${ letter }` }
                                    >
                                        { letter }
                                    </span>
                                ) )
                            }
                        </Typography>

                        {/* Link to WelcomeHeading page. Hidden, under title, rendered on not WelcomeHeading page */ }
                        <MenuButton { ...this.button } />
                    </React.Fragment>
                ) }

                { media === xs && (
                    <MenuButton { ...Object.assign( {}, this.button, { icon: <HomeIcon />, iconButton: { ...this.button.iconButton, classes: { root: welcomeHeadingHomeButton } } } ) } />
                )}

            </React.Fragment>
        );
    }
}

export default withStyles( styles )( withMedia( withLocation( WelcomeHeadingComponent ) ) );
