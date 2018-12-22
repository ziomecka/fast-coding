import * as React from 'react';

import { LessonsLoaderProps } from './container';

import CSR from '@app/CSR';

class LessonsLoaderComponent extends React.Component<LessonsLoaderProps> {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.loadData();
    }

    render() {
        return <CSR/>;
    }
};

export default LessonsLoaderComponent;
