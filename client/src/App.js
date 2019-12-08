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
import Header from './components/Header'
import Courses from './components/Courses'
import CreateCourse from './components/CreateCourse'
import CourseDetail from './components/CourseDetail'
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute';
import Authenticated from './components/Authenticated';
const NotFound = () => {
  return "Not Found"
}

//import withContext from './Context';
// Connect the Header component to context
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);

const UserSignUpWithContext = withContext(UserSignUp);
// Connect UserSignIn to context
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
class App extends Component {
  state = {
    authenticated :  false
  }
  componentDidMount() {
    $.ajax({
      url: "http://localhost:5000/api/courses", 
      type: 'get',
      success: function(result){ 
        console.log(result.courses)
      }
    }); 
    console.log("Component Mountaed again");
  } 

  handleAuth(value){
    this.setState({authenticated: value})
  }

  render () {
    console.log("Reloading...");
    return (
      <BrowserRouter>
        <HeaderWithContext/>
        <Switch>
          {/* <Route exact path="/" component={Public} /> */}
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <PrivateRoute path="/settings" component={AuthWithContext} />
          <Route path="/signin" component={UserSignInWithContext} /> 
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route exact path='/' component={CoursesWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext}/>
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
