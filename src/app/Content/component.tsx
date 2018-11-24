import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '../../app/Dialog/';
import { default as Notification } from '../../app/Notification/';

/** Materials */
import { withStyles } from '@material-ui/core';
import styles from './styles';

import Paper from '@material-ui/core/Paper';

const ContentComponent = class Content extends React.Component<ContentProps> {
  constructor(props: ContentProps) {
    super(props);
  }

  componentDidUpdate(prevProps: ContentProps) {
    const { appLocation } = this.props;
    const prevAppLocation = prevProps.appLocation;

    if (appLocation !== prevAppLocation) {
      this.props.changeLocation(appLocation);
    }
  }

  render() {
    const { location, classes } = this.props;
    const isHome = location.pathname === '/';
    const { contentBox, contentBoxHome, contentBoxOther } = classes;

    return (
      <Paper className={`${contentBox} ${isHome? contentBoxHome : contentBoxOther}`} id="content">
        {this.props.children}
        <Dialog />
        <Notification />
      </Paper>
    );
  }
}

export default withStyles(styles)(ContentComponent);