import * as React from 'react';

import { CoursesLoaderProps } from './container';

import CSR from '@app/CSR';

class CoursesLoaderComponent extends React.Component<CoursesLoaderProps> {
    constructor( props ) {
        super( props );
    }

    async componentDidMount() {
        this.props.loadData();
    }

    async componentDidUpdate( prevProps ) {
        const { authorized } = this.props;
        const { authorized: prevAuthorized } = prevProps;

        if ( authorized !== prevAuthorized && authorized ) {
            // TODO Load data for authorized user
            // this.props.loadData();
        }
    }

    render() {
        return <CSR/>;
    }
}

export default CoursesLoaderComponent;
