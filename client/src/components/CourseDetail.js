import $ from 'jquery';
import React, {Component} from 'react'
class CourseDetail extends Component {
    constructor() {
        super();
        this.state = {
          loading: false,
          result: []
        };
        this.setResult = this.setResult.bind(this);
      }

      componentDidMount() {
          const id = this.props.match.params.id
        $.ajax({
          url: `http://localhost:5000/api/courses/${id}`, 
          type: 'get',
          success: this.setResult
        });
      }

      deleteCourse() { 
        debugger;
        const id = this.props.match.params.id;

        $.ajax({ 
          url: `http://localhost:5000/api/courses/${id}`, 
          type: 'delete',
        })
        .done(() => {
          alert( "Success" );
        })
        .fail(function() {
          alert( "Unauthorized User Cannot Delete A Course" );
        });
      }
  
      setResult(result) {
        this.setState({result, loading: true})
      }
      
    render() {
      if(!this.state.result || !this.state.result.user) {
        return null;
      }
    return (    
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
              {/* inside result check if this authed user is the owner, owner ? Update Course : null    */}

                <a className="button" href="update-course.html">Update Course</a>
                <button className="button" href="#" onClick={() => this.deleteCourse()}>Delete Course</button>
              </span>
              <a className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.result.title}</h3>
              <p>By {this.state.result.user.firstName} {this.state.result.user.lastName}</p>
            </div>
            <div className="course--description">
              <p>{this.state.result.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.result.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <p>{this.state.result.materialsNeeded}</p>
                </li>
              </ul>
            </div>
          </div>
        </div></div>
    )
    }
}
export default CourseDetail;