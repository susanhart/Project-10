import React, {Component} from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import Header from './components/header'
import Courses from './components/Courses'

class App extends Component {
  componentDidMount() {
    $.ajax({
      url: "http://localhost:5000/api/courses", 
      type: 'get',
      success: function(result){ 
        this.setState({ result});
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
