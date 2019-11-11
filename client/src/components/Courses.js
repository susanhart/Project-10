import React, {Component} from 'react'
class Courses extends Component {
    constructor() {
      super();
      this.state = {
        loading: [],
        result: []
      };
    }
      componentDidMount() {
        $.ajax({
          url: "http://localhost:5000/api/courses", 
          type: 'get',
          success: function(result){ 
            console.log(result.courses)
          }
        });
      }
    
    componentWillMount()
    render() {
    return
    <div class="grid-33"><a class="course--module course--link" href="course-detail.html">
            <h4 class="course--label">Course</h4>
            <h3 class="course--title">result</h3>
          </a></div>
    }}