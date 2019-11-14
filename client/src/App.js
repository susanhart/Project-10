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

  // xrender() {
  //   return (
  //     <BrowserRouter>
  //       <div className='container'>
  //       <Route render={(props) => <SearchForm {...props} onSearch={this.performSearch} clearQuery={this.clearQuery} /> }  />
  //         {/* <Route exact path="/" component={() => <SearchForm onSearch={this.performSearch} />}/>
  //         <Route exact path="/waterfalls" component={() => <SearchForm onSearch={this.waterfallsSearch} />}/>
  //         <Route exact path="/flowers" component={() => <SearchForm onSearch={this.flowersSearch} />}/>
  //         <Route exact path="/mountains" component={() => <SearchForm onSearch={this.mountainsSearch} />}/> */}
  //         <Nav />
  //         <Switch>
  //           <Route exact path='/' render={() => <GalleryFetcher path="sunsets" query={this.state.query} />} />
  //           <Route path='/waterfalls' render={() => <GalleryFetcher path="waterfalls" query={this.state.query} />} />
  //           <Route path='/flowers' render={() => <GalleryFetcher path="flowers" query={this.state.query} />} />
  //           <Route path='/mountains' render={() => <GalleryFetcher path="mountains" query={this.state.query} />} />
  //           <Route path='/search' render={() => <GalleryFetcher path="sunsets" query={this.state.query} />} />
  //           <Route component={PageNotFound} />
  //         </Switch>
  //       </div>
  //     </BrowserRouter>
  //   )
  // }
}

export default App;
