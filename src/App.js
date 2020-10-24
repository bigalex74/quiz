import React from 'react';
import classes from './App.css';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {initFirebase} from './Store/actions/rootActions';

import Layout from "./Layout/Layout";
import Main from "./Containers/Main/Main";
import Account from "./Containers/Account/Account";
import SignUp from "./Containers/Register/Register";
import Test from "./Containers/Test/Test";
import EditQuestions from './Containers/Account/editQuestions';
import EditAnswers from './Containers/Account/editAnswers';

import {ACCOUNT, MAIN, AUTH, TEST, LOGIN, EDIT_QUESTIONS, EDIT_ANSWERS} from "./Route/path";
import CssBaseline from '@material-ui/core/CssBaseline';
import {isTeacher} from "./Store/helper";

class App extends React.Component {
  async componentDidMount() {
    // при старте приложения инициализируем бд в firebase
    await this.props.initFirebase();
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
              <Route path={EDIT_QUESTIONS} component={EditQuestions}/>
              <Route path={EDIT_ANSWERS} component={EditAnswers}/>
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
