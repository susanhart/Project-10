import React, {Component} from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import './global.css'; 
import Header from './components/header'
import Courses from './components/Courses'

class App extends Component {
  componentDidMount() {
    $.ajax({
      url: "http://localhost:5000/api/courses", 
      type: 'get',
      success: function(result){ 
        console.log(result.courses)
      }
    }); 
  } 

  render () {
    return (
      <div>
      <Header />
      <Courses/>
      </div>
    );
  }
}

export default App;
