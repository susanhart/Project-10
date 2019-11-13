import $ from 'jquery';
import React, {Component} from 'react'
class Courses extends Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        result: []
      };
      this.setResult = this.setResult.bind(this);
    }
      componentDidMount() {
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
        <div class="grid-33"><a class="course--module course--link" href="course-detail.html">
        <h4 class="course--label">Course</h4>
        <h3 class="course--title">{item.title}</h3>
      </a></div>
      ) )
    return (    
    <div>
      {courseList}
    </div>
    )
    }
}
export default Courses;