import * as React from 'react';

import { UserProps } from './container';

class UserComponent extends React.Component<UserProps> {
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        // TODO cookies
        // this.props.authorize();
    }


    componentWillUnmount() {
        this.props.unauthorize();
    }

    render () {
        return null;
    }
}

export default UserComponent;
