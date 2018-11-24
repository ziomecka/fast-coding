import * as React from 'react';
import Nav from '../../app/Nav';

import { HomeViewProps } from './container';

import LocationChange from '../../app/LocationChange';

import Welcome from '../../app/Welcome/';
import Content from '../../app/Content/';
import TextGenerator from '../../components/TextGenerator/container';
import LessonsLoader from '../../components/LessonsLoader/container';
import User from '../../app/User/container';

import { AppContainers } from '../../_common/';

import {
    HOME_HEADING,
    HOME_HEADING_ANIMATED,
    HOME_NOTIFICATION,
    NOTIFICATION_DURATION,
    HOME_WELCOME_TIMEOUT
} from '../../constants';

const { content, welcome } = AppContainers;

class HomeViewComponent extends React.Component<HomeViewProps> {
  defaultHeading: string;
  defaultAnimateHeading: boolean;
  constructor(props: HomeViewProps) {
    super(props);

    this.defaultHeading = HOME_HEADING;
    this.defaultAnimateHeading = HOME_HEADING_ANIMATED;

    props.openNotification(HOME_NOTIFICATION, NOTIFICATION_DURATION);
  }

  render() {
    const {
      heading = this.defaultHeading,
      animateHeading = this.defaultAnimateHeading
    } = this.props;

    return (
      <>
        {/* Containers will be informed about location change before it happens, because
            LocationChange uses 'shouldComponentUpdate'
         */}
        <LocationChange containers={[
          content,
          welcome
        ]} />

        <User />

        <LessonsLoader />

        <Welcome
          heading={heading}
          animated={animateHeading}
          timeout={HOME_WELCOME_TIMEOUT}
        />

        <Nav />

        <Content>
          {/* TODO nie powinien byc tutaj tylko w lessons, zastanowic sie */}
          <TextGenerator />
          {this.props.children}
        </Content>
      </>
    );
  }
}

export default HomeViewComponent;