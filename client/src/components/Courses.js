import $ from 'jquery';
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class Courses extends Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        result: []
      };
      this.setResult = this.setResult.bind(this);
    }
      componentDidMount() { //component did mount is used to fetch data from the API
        $.ajax({
          url: "http://localhost:5000/api/courses", 
          type: 'get',
          success: this.setResult
        });
      }

    setResult(result) {
      const courses = result.courses
      this.setState({result: courses, loading: true})
    }
    
    render() {
      console.log(this.state.result)
      if(!this.state.result.length) {
      return null;
      }
      const courseList = this.state.result.map((item,key) => (
        <div className="grid-33" key={key}>
          <Link className="course--module course--link" to={`/courses/${item.id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{item.title}</h3>
        </Link></div>
      ) )
    return (    
    <div>
      {courseList}
      <div className="grid-33">
        <Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
    </div>
    )
    }
}
export default Courses;