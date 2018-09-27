import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './views/App'

render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./views/App', () => {
        const NextRoot = require('./views/App') // eslint-disable-line
        // global-require
        render(
            <AppContainer>
                <NextRoot/>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
