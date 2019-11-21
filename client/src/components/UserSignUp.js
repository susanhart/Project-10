import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName:"",
    emailAddress: "",
    // name: "",
    // username: "",
    password: "",
    errors: []
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;
    // const { name, username, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id = "firstName"
                  // id="name"
                  // name="name"
                  name = "firstName"
                  type="text"
                  value = {firstName}
                  //value={name}
                  onChange={this.change}
                  // placeholder="Name"
                  placeholder="firstName"
                />
                <input
                  id = "lastName"
                  // id="name"
                  // name="name"
                  name = "lastName"
                  type="text"
                  value = {lastName}
                  //value={name}
                  onChange={this.change}
                  // placeholder="Name"
                  placeholder="lastName"
                />
                <input
                  // id="username"
                  id="emailAddress"
                  // name="username"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;

    // const { name, username, password } = this.state;
    const { firstName, lastName, emailAddress, password } = this.state;

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    context.data
      .createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(
            `${emailAddress} is successfully signed up and authenticated!`
          );
        }
      })
      .catch(err => {
        // handle rejected promises
        console.log(err);
        this.props.history.push("/error"); //push to history stack
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
