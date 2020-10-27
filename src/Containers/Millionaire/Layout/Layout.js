import React, {Component} from 'react';
import classes from './Layout.module.css';

// Компонент - оболочка, задающий основные стили и разметки верхнего уровня
class Layout extends Component {

  render() {
    return (
      <div className={classes.Layout}>
        <header />
        {/*основа нашего приложения, будет в секции main  */}
        <main>
          { this.props.children }
        </main>
        <footer />
      </div>
    )
  }
}

export default Layout