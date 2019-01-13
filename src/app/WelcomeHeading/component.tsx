import * as React from 'react';

import { WelcomeHeadingProps } from './container';

/** Materials core */
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutesEnum, MenuRulesEnum } from '@appTypes';

/** SubMenu */
import MenuButton, { MenuButtonOptionsI } from '@app/MenuButton/';

const { notAnyLesson, notHome } = MenuRulesEnum;

import { withMedia, MediaEnum } from '@app/Media';
const { xs } = MediaEnum;

import { withLocation } from '@app/LocationHoc/';

require( './style.sass' );

class WelcomeHeadingComponent extends React.Component<WelcomeHeadingProps> {
    classTitleFalling: string;
    button: MenuButtonOptionsI;
    // @ts-ignore
    constructor( props ) {
        super( props );

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

        this.classTitleFalling = 'title-falling';
    }

    render() {
        const {
            props: {
                heading,
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
            classTitleFalling
        } = this;

        const checkHome = appLocation === isHome;

        const lastSpace = heading.lastIndexOf( ' ' );
        const lastWord = heading.slice( lastSpace + 1 );
        const remainingHeading = heading.slice( 0, lastSpace + 1 );

        const classFallingLetters = checkHome
            ? classTitleFalling
            : '';

        const h1Class = `${ headingClass } ${ checkHome ? headingHomeClass : headingOtherClass }`;
        const lettersClass = `${ headingFallingLettersClass } ${ checkHome ? classFallingLetters : '' }`;

        return (
            <React.Fragment>
                { ( media !== xs || checkHome ) && (
                    <React.Fragment>
                        <Typography variant="h1" className={ h1Class }>
                            <span>{ remainingHeading }</span>
                            {
                                Array.from( lastWord ).map( ( letter, ind ) => (
                                    <span className={ lettersClass } key={ `${ ind }-${ letter }` }>
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
                    <MenuButton
                        {
                            ...Object.assign(
                                {},
                                this.button,
                                {
                                    icon: <HomeIcon />,
                                    iconButton: { ...this.button.iconButton, classes: { root: welcomeHeadingHomeButton } }
                                }
                            )
                        }
                    />
                )}
            </React.Fragment>
        );
    }
}

export default withStyles( styles )( withMedia( withLocation( WelcomeHeadingComponent ) ) );
