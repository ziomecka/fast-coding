import * as React from 'react';
import Nav from '../../app/Nav';

import { HomeViewProps } from './container';

import LocationChange from '../../app/LocationChange';

import Welcome from '../../app/Welcome/';
import Content from '../../app/Content/';
import TextGenerator from '../../components/TextGenerator/container';
import LessonsLoader from '../../components/LessonsLoader/container';

import { AppContainers } from '../../_common/';

const { content, welcome } = AppContainers;

class HomeViewComponent extends React.Component<HomeViewProps> {
  defaultHeading: string;
  defaultAnimateHeading: boolean;
  constructor(props: HomeViewProps) {
    super(props);

    this.defaultHeading = "Learn fast coding for free!"
    this.defaultAnimateHeading = true;

    props.openNotification('Nice to see you', 3000);
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

        {/*
        // @ts-ignore */}
        <LessonsLoader />

        <Welcome
          heading={heading}
          animated={animateHeading}
          timeout={1000}
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