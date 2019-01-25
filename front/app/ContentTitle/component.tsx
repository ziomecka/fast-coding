import * as React from 'react';

import { ContentTitleProps } from './container';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import Typography from '@material-ui/core/Typography';

import { AppRoutesEnum } from '@appTypes';

import { Translate, getActiveLanguage } from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';

import getTranslation from '@shared/get.translation';
import { IContentTitleState } from './_duck/';
import { withLocation } from '@app/AppLocation/';

class ContentTitle extends React.Component<ContentTitleProps, IContentTitleState> {
    home: AppRoutesEnum;
    titles: Map<AppRoutesEnum, string>;
    onMissingTranslation: { onMissingTranslation: () => null, renderToStaticMarkup };
    constructor( props ){
        super( props );

        Object.assign( this, AppRoutesEnum );

        const {
            home,
            demo,
            lessons,
            login,
            newUser,
            changePassword,
            remindPassword
        } = AppRoutesEnum;

        this.titles = new Map( [
            [ home, '' ],
            [ demo, 'demoLessonTitle' ],
            [ lessons, 'coursesTitle' ],
            [ login, 'loginTitle' ],
            [ newUser, 'newuserTitle' ],
            [ changePassword, 'changePasswordTitle' ],
            [ remindPassword, 'remindPasswordTitle' ]
        ] );

        this.state = {
            titleId: this.titles.get( this.props.location.pathname as AppRoutesEnum )
        };

        this.onMissingTranslation = { onMissingTranslation: () => null, renderToStaticMarkup };
    }

    componentDidUpdate( prevProps: ContentTitleProps ) {
        const { pathname } = this;

        if ( pathname !== prevProps.location.pathname ) {
            this.setState( { titleId: this.titles.get( pathname as AppRoutesEnum ) } );
        }
    }

    get pathname() {
        return this.props.location.pathname;
    }

    get langCode(): string {
        return getActiveLanguage( this.props.localize ).code;
    }

    get lessonTitle(): string {
        return this.props.lessonTitle[ this.langCode ];
    }

    get lessonTranslation (): string {
        return getTranslation( this.props.localize, 'lessonsLesson' );
    }

    render () {
        const {
            props: {
                classes: { contentTitle, contentTitleLesson },
                lessonNo,
                appLocation,
                isHome,
                isLesson
            },
            state: { titleId },
            lessonTitle, lessonTranslation,
        } = this;

        const lesson = appLocation === isLesson;

        return ( appLocation !== isHome &&
            <Typography variant="h2" className={ `${ contentTitle } ${ lesson ? contentTitleLesson : '' }` }>
                { !lesson && (
                    <Translate id={ titleId } options={ this.onMissingTranslation } />
                ) }

                { lesson &&
                    ( lessonNo !== undefined && lessonNo !== null ) && `${ lessonTranslation } ${ lessonNo + 1 }
                    `
                }
                { lesson &&
                    ( lessonTitle && `${ lessonTitle }` )
                }
            </Typography>
        );
    }
}

export default withStyles( styles )( withLocation( ContentTitle ) );
