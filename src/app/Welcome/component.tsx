import * as React from 'react';

import { WelcomeProps } from './container';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import { AppRoutesEnum } from '@appTypes';
import { buttonsIds } from './_duck/';

/** SubMenu */
import WelcomeHeading from '@app/WelcomeHeading/';

/** Translations */
import { Translate } from 'react-localize-redux';

import { withLocation } from '@app/LocationHoc/';

class WelcomeComponent extends React.Component<WelcomeProps> {
    demoUrl: AppRoutesEnum;
    lessonsUrl: AppRoutesEnum;
    constructor( props ) {
        super( props );

        this.demoUrl = AppRoutesEnum.demo;
        this.lessonsUrl = AppRoutesEnum.lessons;

        this.goToDemo = this.goToDemo.bind( this );
        this.goToLessons = this.goToLessons.bind( this );
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

    render() {
        const {
            props: {
                classes: {
                    paperClass, homeClass, otherClass, buttonsClass,
                    buttonClass, buttonMainClass,
                    lessonClass,
                },
                appLocation,
                isHome,
                isLesson,
                heading
            }
        } = this;

        const checkHome = appLocation === isHome;
        const checkLesson = appLocation === isLesson;

        return (
            <Paper className={
                `${ paperClass } ${ checkHome
                    ? homeClass
                    : checkLesson
                        ? lessonClass
                        : otherClass
                }`
            }>
                <WelcomeHeading { ...{ heading } } />

                {/* Render buttons only when Home */}
                { checkHome && (
                    <div className={ buttonsClass }>
                        <Button
                            onClick={ this.goToLessons }
                            className={ buttonClass }
                            id={ buttonsIds[ 0 ] }
                        >
                            <Translate id="welcomeGoToCourses"/>
                        </Button>
                        <Button
                            className={`${ buttonClass } ${ buttonMainClass }`}
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

export default withStyles( styles )( withLocation( WelcomeComponent ) );
