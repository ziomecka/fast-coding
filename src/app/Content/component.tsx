import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '../../app/Dialog/';
import { default as Notification } from '../../app/Notification/';
import DragOverable from '../DragOverable';

/** Materials */
import { withStyles } from '@material-ui/core';
import styles from './styles';

import { AppRoutes } from '../../_common';

const ContentComponent = class Content extends React.Component<ContentProps> {
    home: string;
    constructor(props: ContentProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.home = AppRoutes.home;
  }

  componentDidUpdate(prevProps: ContentProps) {
    const { appLocation } = this.props;
    const prevAppLocation = prevProps.appLocation;

    if (appLocation !== prevAppLocation) {
      this.props.changeLocation(appLocation);
    }
  }

  onDrop(e: React.DragEvent<HTMLElement>) {
      this.props.onDrop.forEach(fun => fun(e));
  }

  render() {
    const { location, classes } = this.props;
    const isHome = location.pathname === this.home;
    const { contentBox, contentBoxHome, contentBoxOther } = classes;

    return (
        <DragOverable
            className={`${contentBox} ${isHome? contentBoxHome : contentBoxOther}`}
            id="content"
            onDrop={this.onDrop}
        >
            {this.props.children}
            <Dialog />
            <Notification />
        </DragOverable>
    );
  }
}

export default withStyles(styles)(ContentComponent);