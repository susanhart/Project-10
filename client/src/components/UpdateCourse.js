import React, { Component } from 'react';
import Form from './Form.js';
import axios from "axios";

export default class UpdateCourse extends Component {
    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        studentName: "",
        errors: []
    }
    componentDidMount(){
        const {context} = this.props;
        const courseId = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${courseId}`).then(response => {
            const course = response.data;

            this.setState({
                title: course.title,
                description: course.description,
                estimatedTime: course.estimatedTime || "",
                materialsNeeded: course.materialsNeeded || "",
            });
        });
        
        console.log(context);
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
        console.log("WE CALLED SUBMIT")
        const { title, description } = this.state;
        const { emailAddress, password } = this.props.context.authenticatedUser;
        // context.actions.signIn(title, description)
        console.log(title);
        console.log(description);
        
        //Create the ajax call
        const courseId = this.props.match.params.id; // react router passes to the properties on the component using it
    
        axios.put(`http://localhost:5000/api/courses/${courseId}`, this.state, {
            auth: {
                username: emailAddress,
                password: password,
            }
        }).then(() => this.props.history.push("/"))
        .catch((error)=>{
          console.log(error.response.data)
          this.setState({errors: error.response.data.error})
        });
    }
    cancel = () => {
        this.props.history.goBack();
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
          <h1>Update Course</h1>
          <div>
            <div>
              
            </div>
            <Form
              cancel={this.cancel}
              submit={this.submit}
              errors={errors}
              submitButtonText="Update Course"
              elements={() => (
                <React.Fragment>
                  <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    onChange={this.change} 
                    value={title}
                    placeholder="Title" />
                  <textarea 
                    id="description" 
                    name="description"
                    onChange={this.change} 
                    value={description}
                    type="textarea"
                    placeholder="Description" />
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime"
                    onChange={this.change}
                    value={estimatedTime}
                    type="text" 
                    placeholder="Estimated Time" /> 
                  <input 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    onChange={this.change}
                    value={materialsNeeded} 
                    type="text"  
                    placeholder="Materials Needed" />                   
                </React.Fragment>
              )} />
          </div>
        </div>
      )
      }
}