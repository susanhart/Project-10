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
          success: this.setResult
        });
      }

    setResult(result) {
      this.setState({ result})
    }
    
    render() {
      console.log(this.state.result)
      if(!this.state.result.length) {
      return null;
      }
    return (    
    <div>
      {this.state.result[0].title}
    </div>
    )
    }
}
export default Courses;