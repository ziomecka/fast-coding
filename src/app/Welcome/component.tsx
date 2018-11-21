import * as React from 'react';
import { CSSProperties } from 'react'
require('./style.sass');

import Paper from '@material-ui/core/Paper';

import { WelcomeProps } from './container';
import { colors } from '../../theme/';

class WelcomeComponent extends React.Component<WelcomeProps> {
  style: CSSProperties;
  constructor(props) {
    super(props);
    this.style = {
      backgroundColor: colors.primary.main
    };
  }

  componentDidUpdate(prevProps: WelcomeProps) {
    const { appLocation } = this.props;
    const prevAppLocation = prevProps.appLocation;

    if (appLocation !== prevAppLocation) {
      this.props.changeLocation(appLocation);
    }
  }

  heading = () => {
    const { animated, heading, classAnimated } = this.props;

    if (animated) {
      const lastSpace = heading.lastIndexOf(' ');
      const lastWord = heading.slice(lastSpace);
      const remainingHeading = heading.slice(0, lastSpace);

      return (
        <>
          {remainingHeading} {
            Array.from(lastWord).map((letter, ind) => (
              <span
              className={classAnimated}
              key={`${ind}-${letter}`}
              >
                {letter}
              </span>
            ))
          }
        </>
      );
    }

    return <>{heading}</>;
  };

  render()  {
    const { classTitle } = this.props;
    const { heading } = this;

    return (
        <Paper className={classTitle} style={this.style}>
          <h1>{heading()}</h1>
        </Paper>
    );
  }
};

export default WelcomeComponent;
