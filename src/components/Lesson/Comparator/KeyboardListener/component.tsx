import * as React from 'react';

import { KeyboardListenerProps } from './container';

class KeyboardListenerComponent extends React.Component<KeyboardListenerProps> {
  event: string;
  validCodes: [number, number][];
  backspace: number;
  constructor(props) {
    super(props);
    this.event = 'keydown';

    /**
     * @constant {array}
     * [32] - space
     * [48, 90] - digits, letters
     * [96, 111] - numpad
     * [186, 192] - special chars
     * [219, 222] - special chars
     */
    this.validCodes = [
        [32, 32],
        [48, 90],
        [96, 111],
        [186, 192],
        [219, 222],
    ];

    this.backspace = 8;
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
    return this.validCodes.some(range => (
        (code >= range[0]) &&
        (code <= range[1])
    ));
  }

  isBackspace(code: number): boolean {
    return code === this.backspace;
  }

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
