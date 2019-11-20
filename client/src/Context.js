import React, { Component } from 'react';
import Data from './Data';
constructor() {
    super();
    this.data = new Data();
  }
  return (
    <Context.Provider value={ }>
      {this.props.children}
    </Context.Provider>  
  );
  const value = {
    data: this.data,
  };
  
  return (
    <Context.Provider value={value}>
      {this.props.children}
    </Context.Provider>  
  );
  export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }