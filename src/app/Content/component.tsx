import * as React from 'react';

import { ContentProps } from './container';
import { default as Dialog } from '../../app/Dialog/';
import { default as Notification } from '../../app/Notification/';

require('./style.sass');

/** Materials */
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
    const { contentClass } = this.props;

    return (
      <Paper className={contentClass} id="content">
        {this.props.children}
        <Dialog />
        <Notification />
      </Paper>
    );
  }
}

export default ContentComponent;