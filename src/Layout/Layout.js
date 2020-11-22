import React, {Component} from 'react'
import ApplicationBar from "../Components/Navigation/Panel/Panel";

class Layout extends Component {

  render() {
    return (
      <div>
        <ApplicationBar/>
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout
