import React, {Component} from 'react'
import Drawer from "../Components/Navigation/Drawer/Drawer";
import MenuToggle from "../Components/Navigation/MenuToggle/MenuToggle";

class Layout extends Component {
    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    };

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    };

  render() {
    return (
      <div>
          <Drawer
              isOpen={this.state.menu}
              onClose={this.menuCloseHandler}
          />

          <MenuToggle
              onToggle={this.toggleMenuHandler}
              isOpen={this.state.menu}
          />

        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout