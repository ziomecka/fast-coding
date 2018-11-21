import * as React from 'react';

import { AppNotificationProps } from './container';

/** Materials */
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

const NotificationComponent: React.StatelessComponent<AppNotificationProps> = props => {
  let {
    open = false,
    text,
  } = props;

  const style = {
    display: 'inline-flex',
    top: 'auto',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto'
  };

  const stylePaper = {
    display: 'inline-flex',
    justifyContent: 'center'
  };

  return (
    <Modal {...{ open, style }} hideBackdrop={true}>
      <Slide direction="up" in={open}>
        <Slide direction="down" in={!open}>
          <Paper style={ stylePaper} elevation={10}>
            <p>{text}</p>
          </Paper>
        </Slide>
      </Slide>
    </Modal>
  );
};

export default NotificationComponent;
