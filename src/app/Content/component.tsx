import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '@app/Dialog/';
import { default as Notification } from '@app/Notification/';
import DragOverable from '../DragOverable';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import Typography from '@material-ui/core/Typography';

import { AppRoutesEnum } from '@appTypes';

import { Translate, getActiveLanguage } from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';

import getTranslation from '@shared/get.translation';

const { demo, home, lessons, login, newuser, remindPassword, changePassword, newPassword } = AppRoutesEnum;

const ContentComponent = class Content extends React.Component<ContentProps> {
    home: string;
    constructor(props: ContentProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.home = AppRoutesEnum.home;
  }

  get titles() {
    return {
        [home]: '',
        [demo]: 'demoLessonTitle',
        [lessons]: 'coursesTitle',
        [login]: 'loginTitle',
        [newuser]: 'newuserTitle',
        [remindPassword]: 'remindPasswordTitle',
        [changePassword]: 'changePasswordTitle',
        [newPassword]: 'newPasswordTitle'
    };
  }

  get isLesson() {
      return RegExp(`.*\lesson-.*`).test(this.props.location.pathname);
  }

  get isHome() {
      return this.props.location.pathname === this.home;
  }

  get pathname() {
      return this.props.location.pathname;
  }

  componentDidMount() {
    const { pathname } = this;

    if (pathname !== this.home) {
        let id = this.titles[pathname];
        if (id !== undefined) {
            this.props.changeTitle(this.titles[pathname]);
        }
    }
  }

  componentDidUpdate(prevProps: ContentProps) {
    const { appLocation } = this.props;
    const prevAppLocation = prevProps.appLocation;
    const { pathname } = this.props.location;
    const prevPathname = prevProps.location.pathname;

    // TODO - improve / change?
    if (appLocation !== prevAppLocation) {
      this.props.changeLocation(appLocation);
    }

    if ( pathname !== prevPathname ) {
        this.props.changeTitle(this.titles[pathname])
    }
  }

  onDrop(e: React.DragEvent<HTMLElement>) {
      this.props.onDrop.forEach(fun => fun(e));
  }

  get langCode() {
      return getActiveLanguage(this.props.localize).code
  }

  get lessonTitle(): string {
      return this.props.lessonTitle[this.langCode];
    }

  get lessonTranslation(): string {
      return getTranslation(this.props.localize, "lessonsLesson");
  }

  render() {
    const { classes, title, lessonNo } = this.props;
    const { isHome, isLesson, lessonTitle, lessonTranslation } = this;
    const { contentBox, contentBoxHome, contentBoxOther, contentTitle } = classes;

    return (
        <DragOverable
            className={`${contentBox} ${isHome? contentBoxHome : contentBoxOther}`}
            id="content"
            onDrop={this.onDrop}
        >
            <Typography variant="h2" className={contentTitle}>
                <Translate id={title} options={ {
                    // TODO nie podoba mi się
                    // bo jest zbyt 'proste'
                    // bo trudno dodawać style
                    onMissingTranslation: () => (
                        isLesson && (
                            `${ lessonTranslation } ${ lessonNo + 1 }
                            ${ lessonTitle }`
                        )
                    ) || '',
                    renderToStaticMarkup
                }} />
            </Typography>

            {this.props.children}

            <Dialog />

            <Notification />
        </DragOverable>
    );
  }
}

export default withStyles(styles)(ContentComponent);