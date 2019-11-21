import React, {Component} from 'react';
import withContext from './Context';
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
import UserSignOut from './components/UserSignOut';

const NotFound = () => {
  return "Course Not Found"
}

//import withContext from './Context';
// Connect the Header component to context
const HeaderWithContext = withContext(Header);

const UserSignUpWithContext = withContext(UserSignUp);
// Connect UserSignIn to context
const UserSignInWithContext = withContext(UserSignIn);

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
          <Route path="/signin" component={UserSignInWithContext} /> 
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOut} />
          <Route component={NotFound} />
          <Route exact path='/' render={() => <Courses/>} />
          <Route exact path="/courses/create" component={() => <CreateCourse/>} />
          <Route exact path="/courses/:id" component={CourseDetail} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
