import * as React from 'react';
import Nav from '@app/Nav';

import { HomeViewProps } from './container';

import Content from '@app/Content/';
import TextGenerator from '@components/TextGenerator/';
import LessonsLoader from '@components/LessonsLoader/';
import User from '@app/User/';
import KeyboardListener from '@app/KeyboardListener/';
import TranslationsLoader from '@app/TranslationsLoader/';

class HomeViewComponent extends React.Component<HomeViewProps> {
    componentDidMount() {
        this.props.isAuthorized();
    }

    render() {
        return (
            <React.Fragment>
                <User />
                <KeyboardListener />
                <LessonsLoader />
                <Nav />

                <Content>
                    {/* TODO nie powinien byc tutaj tylko w lessons, zastanowic sie */}
                    <TextGenerator />
                    { this.props.children }
                </Content>

                <TranslationsLoader />
            </React.Fragment>
        );
    }
}

export default HomeViewComponent;
