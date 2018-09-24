import React from 'react'
import {render} from 'react-dom';

export default class App extends React.Component {
  render () {
    return (<div className="App">
      <h1 className="App-Title">Hello Parcel x React</h1>
      <div>tuioewisdsouad 2342sd31</div>
      <div>asidj</div>
    </div>)
  }
}

render(<App/>, document.getElementById('root'))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
