import React from 'react';
import classes from './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from "./Layout/Layout";
import Main from "./Containers/Main/Main";
import Account from "./Containers/Account/Account";
import SignUp from "./Containers/Register/Register";
import Test from "./Containers/Test/Test";
import {ACCOUNT, MAIN, AUTH, TEST} from "./Route/path";
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
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

export default App;
