import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '../../app/Dialog/';
import { default as Notification } from '../../app/Notification/';
import DragOverable from '../DragOverable';

/** Materials */
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import Typography from '@material-ui/core/Typography';

import { AppRoutes } from '../../_common';
import {} from 'react-redux';

import { Translate } from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';

const { demo, home, lesson, lessons, login, newuser } = AppRoutes;
const ContentComponent = class Content extends React.Component<ContentProps> {
    home: string;
    constructor(props: ContentProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.home = AppRoutes.home;
  }

  get titles() {
    return {
        [home]: '',
        [demo]: 'demoLessonTitle',
        [lessons]: 'coursesTitle',
        [login]: 'loginTitle',
        [newuser]: 'newuserTitle'
    };
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

  render() {
    const { classes, title } = this.props;
    const { isHome } = this;
    const { contentBox, contentBoxHome, contentBoxOther, contentTitle } = classes;

    return (
        <DragOverable
            className={`${contentBox} ${isHome? contentBoxHome : contentBoxOther}`}
            id="content"
            onDrop={this.onDrop}
        >
            <Typography variant="h2" className={contentTitle}>
                <Translate id={title} options={ {
                    onMissingTranslation: () => '',
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