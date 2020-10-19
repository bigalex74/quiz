import React from 'react';
import classes from './App.css';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {initFirebase} from './Store/actions/actions';

import Layout from "./Layout/Layout";
import Main from "./Containers/Main/Main";
import Account from "./Containers/Account/Account";
import SignUp from "./Containers/Register/Register";
import Test from "./Containers/Test/Test";
import {ACCOUNT, MAIN, AUTH, TEST, LOGIN} from "./Route/path";
import CssBaseline from '@material-ui/core/CssBaseline';
import {isTeacher} from "./Store/helper";

class App extends React.Component {
  async componentDidMount() {
    // при старте приложения инициализируем бд в firebase
    console.log('1');
    await this.props.initFirebase();
    console.log('2', this.props);
    if (this.props.user !== null)
      if (isTeacher(this.props.user.email))
        this.props.history.push(ACCOUNT);
      else
        this.props.history.push(MAIN);
    else
      this.props.history.push(LOGIN);
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initFirebase: () => dispatch(initFirebase()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
