import React from 'react';
import './App.css';
import Layout from "./Layout/Layout";
import Main from "./Containers/Main/Main";

function App() {
  return (
      <Layout>
        <div className="App">
        <Main/>
        </div>
      </Layout>
  );
}

export default App;
