require('react-hot-loader/patch');

import React from 'react';
import { render } from 'react-dom';
import Layout from 'scripts/containers/layout';
import { AppContainer } from 'react-hot-loader'

render(
    <AppContainer>
        <Layout />
    </AppContainer>,
    document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./js/containers/layout', () => {
        const NextApp = require('./js/containers/layout').default;
        render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}