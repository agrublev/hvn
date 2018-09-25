import React, {Component} from 'react'

export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    console.log("BVRAND NEWt");

    window.addEventListener("hashchange", function (event) {
      console.log(event)
    })
  }


  handleChange(e) {
    console.log(e)

  }

  componentDidUpdate(){
    console.log("BVRAND UPPPP");
  }

  render() {
    console.log("BVRAND NEWt RENDER");
    return (
      <div id="wrap">
        <input type="text"
               placeholder="start typing for commands..."
               ref={(ref) => this.ref}
               onKeyUp={(e) => this.handleChange(e)}
        />
      </div>
    )
  }
}
