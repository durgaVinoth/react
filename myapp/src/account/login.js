import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fieldList: {},
      errorList: {},
      message: ''
    };
  }

  processInput = (obj) => {
    let fieldList = this.state.fieldList;
    fieldList[obj.target.name] = obj.target.value;
    this.setState({
      fieldList
    })
  }

  login = (obj) => {
    obj.preventDefault()  //default function are there i will avoid that
    let fieldList = this.state.fieldList;
    let errorList = this.state.errorList;
    let formStatus = true;

    if (!fieldList["myemail"] || fieldList["myemail"] == "") {
      formStatus = false;
      errorList["emailError"] = "Please Enter your Email"
    }
    else {
      errorList["emailError"] = ""
    }

    //email validation 
    let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!epattern.test(fieldList["myemail"])) {
      formStatus = false;
      errorList["emailError"] = "Please Enter valid Emai-id"
    }
    else {
      errorList["emailError"] = ""
    }

    //Password Validation
    if (!fieldList["mypassword"] || fieldList["mypassword"].length < 6) {
      formStatus = false;
      errorList["passwordError"] = "Please Enter valid Password between 6 to 8"
    }
    else {
      errorList["passwordError"] = ""
    }


    let myMessage = "";
    if (formStatus == false) {
      myMessage = "Highlighted field are invalid";
    }
    else {
      myMessage = "Validation Success, Please wait for Submitting...";
    }
    this.setState({
      errorList,
      message: myMessage
    })

    let loginStatus = false;
    let email = this.state.fieldList.myemail;
    let pass = this.state.fieldList.mypassword;

    if (formStatus == true) {
      var url = "http://localhost:3002/users";
      axios.get(url).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          if (email == response.data[i].myemail && pass == response.data[i].mypassword) {
            localStorage.setItem("name", response.data[i].myname);
            localStorage.setItem("userid", response.data[i].id);
            loginStatus = true;
            break;
          }// if end
        }  // for end

        if(loginStatus==true){
          this.setState({ message: "Login Success ! Please wait redirecting..."});
           //window.location.href="http://localhost:3000/#/dashboard";  development
           window.location.href="http://localhost:5500/#/dashboard";  // deployment
          window.location.reload();
        }else{
          this.setState({ message: "Login Fail ! Invalid or not exists..."})
        }
      }) // axios get end here
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
              <div className="text-white text-center">
                  <h2> <i className="fa fa-shopping-cart"></i> React Shopping App </h2>
                  <small> <i className="fa fa-handshake-o"></i> You are Welcome </small>
              </div>
            <p className="text-center text-white">{this.state.message}</p>
            <form onSubmit={this.login}>
              <div className="card">
                <div className="card-header bg-light text-danger">
                  <i className="fa fa-lock fa-lg"></i> Login
                  <label className="fa-pull-right text-warning">
                    <Link to="/register" className="text-warning">
                      <i className="fa fa-user-plus"></i> New ? Register
                    </Link>
                  </label>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label>Email-Id</label>
                    <input
                      type="text"
                      name="myemail"
                      onChange={this.processInput}
                      className="form-control"
                    />
                    <small className="text-danger">{this.state.errorList.emailError}</small>
                  </div>
                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="mypassword"
                      onChange={this.processInput}
                      className="form-control"
                    />
                    <small className="text-danger">{this.state.errorList.passwordError}</small>
                  </div>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-danger">
                    Login <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    );
  }
}

export default Login;
