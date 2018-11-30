import * as React from 'react';
import Nav from '../../app/Nav';

import { HomeViewProps } from './container';

import LocationChange from '../../app/LocationChange';

import Content from '../../app/Content/';
import TextGenerator from '../../components/TextGenerator/container';
import LessonsLoader from '../../components/LessonsLoader/container';
import User from '../../app/User/container';

import { AppContainers, AppRoutes } from '../../_common/';

import {
    HOME_NOTIFICATION,
} from '../../constants';

const { content, welcome } = AppContainers;

class HomeViewComponent extends React.Component<HomeViewProps> {
    homeUrl: string;
    constructor(props: HomeViewProps) {
        super(props);

        this.homeUrl = AppRoutes.home;

        props.openNotification(HOME_NOTIFICATION);

        this.props.addKeyDownListener();
    }

    componentDidUpdate(prevProps: HomeViewProps) {
        const { pathname } = this.props.location;
        const prevPathname = prevProps.location.pathname;

        if (pathname !== prevPathname) {
            if (pathname === this.homeUrl) {
                this.props.addKeyDownListener();
            } else {
                this.props.removeKeyDownListener();
            }
        }
    }

    render() {
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