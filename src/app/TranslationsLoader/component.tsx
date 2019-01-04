import * as React from 'react';

import { TranslationsLoaderProps } from './container';

class TranslationsLoaderComponent extends React.Component<TranslationsLoaderProps> {
    async componentDidMount(): Promise<void> {
        this.props.loadData();
    }

    render() {
        return null;
    }
};

export default TranslationsLoaderComponent;
