import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router';
import Layout from "./Layout/Layout";
import Main from "./Containers/Main/Main";
import Account from "./Containers/Account/Account";
import Log from "./Containers/Log/Log";
import Register from "./Containers/Register/Register";
import Test from "./Containers/Test/Test";
import {ACCOUNT, LOG, MAIN, REGISTER, TEST} from "./Route/path";

function App() {
  return (
    <Layout>
      <div className="App">
        <Switch>
          <Route path={MAIN} exact component={Main}/>
          <Route path={ACCOUNT} component={Account}/>
          <Route path={LOG} component={Log}/>
          <Route path={REGISTER} component={Register}/>
          <Route path={TEST} component={Test}/>
        </Switch>
        <Main/>
      </div>
    </Layout>
  );
}

export default App;
