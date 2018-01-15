import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import HeaderComponent from './common/header-component';
import FooterComponent from './common/footer-component';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        {this.props.children}
        <FooterComponent />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
