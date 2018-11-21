import * as React from 'react';

import { KeyboardListenerProps } from './container';

class KeyboardListenerComponent extends React.Component<KeyboardListenerProps> {
  event: string
  constructor(props) {
    super(props);
    this.event = 'keydown';
    this.handleKeyboardPress = this.handleKeyboardPress.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { turnedOn } = this.props;
    const nextTurnedOn = nextProps.turnedOn;

    if (turnedOn !== nextTurnedOn) {
      if (nextTurnedOn) {
        this.addEventListener();
      } else {
        this.removeEventListener();
      }
    }
  }

  addEventListener(): void {
    document.addEventListener(this.event, this.handleKeyboardPress);
  }

  removeEventListener(): void {
    document.removeEventListener(this.event, this.handleKeyboardPress);
  }

  componentWillMount() {
    this.addEventListener();
  }

  componentWillUnmount() {
    this.removeEventListener();
  }

  isValidCode(code: number): boolean {
    return (code > 31 && code < 127);
  }

  isBackspace(code: number): boolean {
    return code === 8;
  }

  // TODO can be moved to operations
  handleKeyboardPress(event: KeyboardEvent): void {
    const { key, keyCode } = event;

    switch (true) {
      case this.isValidCode(keyCode): {
        this.props.handleKeyDown(key);
        break;
      }
      case this.isBackspace(keyCode): {
        this.props.handleBackSpace();
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return null;
  }
}

export default KeyboardListenerComponent;
