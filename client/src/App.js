import React, {Component} from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {
  componentDidMount() {
    $.ajax({
      url: "http://localhost:5000/api/courses", 
      success: function(result){ 
        console.log(result.courses)
      }
    });
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="div1"></div> 
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
