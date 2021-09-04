import React, { Component } from 'react';
import './loading.css'; // Tell webpack that Button.js uses these styles

class Loading extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
  }
}

export default Loading;
