import * as React from 'react';
import { CSSProperties } from 'react'

import { WelcomeProps } from './container';

/** Materials core */
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

require('./style.sass');

class WelcomeComponent extends React.Component<WelcomeProps> {
  style: CSSProperties;
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps: WelcomeProps) {
    const { appLocation } = this.props;
    const prevAppLocation = prevProps.appLocation;

    if (appLocation !== prevAppLocation) {
      this.props.changeLocation(appLocation);
    }
  }

  heading = () => {
    const { animated, heading, classes } = this.props;

    if (animated) {
      const lastSpace = heading.lastIndexOf(' ');
      const lastWord = heading.slice(lastSpace);
      const remainingHeading = heading.slice(0, lastSpace);

      return (
        <>
          {remainingHeading} {
            Array.from(lastWord).map((letter, ind) => (
              <span
                className={`${classes.fallingLetters} title-falling`}
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
    const { classes, location } = this.props;
    const { heading } = this;
    const isHome = location.pathname === '/';

    return (
        <Paper className={
            `${classes.welcomePaper} ${isHome ? classes.welcomeHome : classes.welcomeOther}`
        }>
          <h1>{heading()}</h1>
            {isHome && (
                <Button
                    onClick={() => {}}
                    className={classes.welcomeButton}
                >
                    Start typing
                </Button>
            )}
        </Paper>
    );
  }
};

export default withStyles(styles)(WelcomeComponent);