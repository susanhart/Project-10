import $ from 'jquery';
import React, {Component} from 'react'
class Courses extends Component {
    constructor() {
      super();
      this.state = {
        loading: [],
        result: []
      };
      this.setResult = this.setResult.bind(this);
    }
      componentDidMount() {
        $.ajax({
          url: "http://localhost:5000/api/courses", 
          type: 'get',
          success: function(result){ 
            this.setResult(result);
          }
        });
      }

    setResult() {
      this.setState({ result})
    }
    
    render() {
    return (
    <div> </div>
    )
    }
}
export default Courses;