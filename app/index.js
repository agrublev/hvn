import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './containers/App'
import './style.less'


render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextRoot = require('./containers/App') // eslint-disable-line
        // global-require
        render(
            <AppContainer>
                <NextRoot/>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
