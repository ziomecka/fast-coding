import * as React from 'react';

import { LessonsLoaderProps } from './container';

import CSR from '../../app/CSR';
import { ApplicationContainers, ComponentsContainers } from '../../_common/';

import { LocalStorageItemTypes } from '../../_common/index';

const { components  } = ApplicationContainers;
const { lessonsLoader } = ComponentsContainers;

class LessonsLoaderComponent extends React.Component<LessonsLoaderProps> {
    url: string;
    applicationContainer: ApplicationContainers;
    container: ComponentsContainers;
    item: LocalStorageItemTypes;
    constructor(props) {
        super(props);
        this.url = '/lessons/get';
        this.applicationContainer = components;
        this.container = lessonsLoader;
        this.item = LocalStorageItemTypes.lessons;
    }

    async componentDidMount() {
        const { url, applicationContainer, container, item } = this;
        this.props.loadData(
            url,
            applicationContainer,
            container,
            item
        );
    }

    render() {
        return <CSR/>;
    }
};

export default LessonsLoaderComponent;
