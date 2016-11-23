require('react-hot-loader/patch');
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from 'scripts/app';

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./js/app', () => {
        const NextApp = require('./js/app').default;
        render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}