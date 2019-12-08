import axios from "axios";
import React, {Component} from 'react'
import Form from "./Form";

class CreateCourse extends Component {
    constructor() {
      super();
      this.state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
      };
    
    }
    change = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [name]: value
        };
      });
    }
    submit = () => {
      const { title, description } = this.state;
      const { emailAddress, password } = this.props.context.authenticatedUser;
      // context.actions.signIn(title, description)
      console.log(title);
      console.log(description);
      
      //Create the ajax call
      axios.post(`http://localhost:5000/api/courses`, this.state, {
        auth: {
          username: emailAddress,
          password: password,
        }
      }).then(() => {
        this.props.history.push("/");
      });
      
  }
  cancel = () => {
    this.props.history.push("/");
};
    render() {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors
      } = this.state;
    return (    
    <div>
        <h1>Create Course</h1>
        <div>
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <Form
            cancel={this.cancel}
            submit={this.submit}
            errors={errors}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <input 
                  id="title" 
                  name="title" 
                  type="text" 
                  onChange={this.change} 
                  placeholder="Title" />
                <textarea 
                  id="description" 
                  name="description"
                  onChange={this.change} 
                  type="textarea"
                  placeholder="Description" />
                <input 
                  id="estimatedTime" 
                  name="estimatedTime"
                  onChange={this.change} 
                  type="text" 
                  placeholder="Estimated Time" /> 
                <input 
                  id="materialsNeeded" 
                  name="materialsNeeded"
                  onChange={this.change} 
                  type="text"  
                  placeholder="Materials Needed" />                   
              </React.Fragment>
            )} />
        </div>
      </div>
    )
    }
}
export default CreateCourse;
