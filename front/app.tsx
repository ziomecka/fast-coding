import * as React from 'react';
import RootView from './views/';
import { Provider } from 'react-redux';

import { default as store } from '@appStore';
import { MediaProvider } from '@app/Media/';

/** Resets */
import './styles/';

const App = () => {
    return (
        <Provider {...{ store }}>
            <MediaProvider>
                <RootView />
            </MediaProvider>
        </Provider>
    );
};

export default App;