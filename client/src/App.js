import React, {Component} from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import './global.css'; 
import Header from './components/header'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import CourseDetail from './components/CourseDetail'
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);

 // New import
import withContext from './Context';

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
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Courses/>} />
          <Route exact path="/courses/create" component={() => <CreateCourse/>} />
          <Route exact path="/courses/:id" component={CourseDetail} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
