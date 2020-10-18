import React from 'react';
import classes from './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {initFirebase} from './Store/actions/actions';

import Layout from "./Layout/Layout";
import Main from "./Containers/Main/Main";
import Account from "./Containers/Account/Account";
import SignUp from "./Containers/Register/Register";
import Test from "./Containers/Test/Test";
import {ACCOUNT, MAIN, AUTH, TEST} from "./Route/path";
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  componentDidMount() {
    // при старте приложения инициализируем бд в firebase
    this.props.initFirebase()
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <Layout>
          <div className={classes.App}>
            <Switch>
              <Route path={MAIN} exact component={Main}/>
              <Route path={ACCOUNT} component={Account}/>
              <Route path={AUTH} component={SignUp}/>
              <Route path={TEST} component={Test}/>
              <Redirect to={MAIN}/>
            </Switch>
            <Main/>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

// function mapStateToProps(state) {
// }

function mapDispatchToProps(dispatch) {
  return {
    initFirebase: () => dispatch(initFirebase()),
  }
}

export default connect(null, mapDispatchToProps)(App)
