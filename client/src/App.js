import React, { Component } from 'react';

import Layout from "./companents/layout";
import Header from "./companents/header";

class App extends Component {
  render() {
    return (
      <Layout>
        <Header title="Task"/>
        <span className="border border-secondary rounded bg-secondary h1 text-warning">Hello, React!</span>
      </Layout>
    );
  }
}

export default App;
