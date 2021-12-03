import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Register extends Component{
   constructor(){
       super();
       this.state={
           fieldList:{},
           errorList:{},
           message:''
       }
   }

   processInput = (obj) =>{
    let fieldList = this.state.fieldList;
    fieldList[obj.target.name] = obj.target.value;
    this.setState({
        fieldList
    })
   }

   register = (obj) =>{
        obj.preventDefault();
        let fieldList = this.state.fieldList;
        let errorList = this.state.errorList;
        let formStatus = true;
        
        if( !fieldList["myname"] || fieldList["myname"]==""){
            formStatus = false;
            errorList["nameError"] = "Please Enter Your name !";
        }else{
            errorList["nameError"] = "";
        }
        //email validation 
        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if( ! epattern.test(fieldList["myemail"]))
        {
            formStatus = false;
            errorList["emailError"] = "Please Enter Valid e-Mail id !";
        }else{
            errorList["emailError"] = "";
        }

        //password validation
        if( ! fieldList["mypassword"] || fieldList["mypassword"].length<6 )
        {
            formStatus = false;
            errorList["passError"] = "Password should be between 6 to 8 in length";
        }else{
            errorList["passError"] = "";
        }

        //mobile validation 
        let mpattern = /^[6-9]\d{9}$/;
        if( ! mpattern.test(fieldList["mymobile"]))
        {
            formStatus = false;
            errorList["mobileError"] = "Please 10 digits Mobile No";
        }else{
            errorList["mobileError"] = "";
        }


        let mymessage='';
        if(formStatus==false){
            mymessage = "The red color marked fields are invalid !";
        }else{
            mymessage = "Validation Success , Please wait submitting...";
        }

        this.setState({
            errorList,
            message:mymessage
        })

        if(formStatus==true){
            var jsonData =this.state.fieldList;
            var url = "http://localhost:3002/users";
            axios.post(url , jsonData).then(response=>{
                this.setState({ message:"Register Success !"})
            })
        }
   }

    render(){
        return(
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                        <div className="text-white text-center">
                            <h2> <i className="fa fa-shopping-cart"></i> React Shopping App </h2>
                            <small> <i className="fa fa-handshake-o"></i> You are Welcome </small>
                        </div>
                            <p className="text-center text-white">{this.state.message}</p>
                            <form onSubmit={this.register}>
                            <div className="card">
                                <div className="card-header bg-light text-danger">
                                    <i className="fa fa-user-plus fa-lg"></i> Register
                                    <label className="fa-pull-right"> 
                                        <Link to="/login" className="text-warning">
                                            <i className="fa fa-lock"></i> Already Register ? 
                                        </Link>
                                    </label>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label>Full Name</label>
                                        <input type="text" className="form-control"
                                        name="myname" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.nameError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label>e-Mail Id</label>
                                        <input type="text" className="form-control"
                                        name="myemail" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.emailError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input type="password" maxLength="8" className="form-control"
                                        name="mypassword" onChange={this.processInput}/>
                                         <small className="text-danger">{this.state.errorList.passError}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label>Contact No.</label>
                                        <input type="number" className="form-control"
                                        name="mymobile" onChange={this.processInput}/>
                                        <small className="text-danger">{this.state.errorList.mobileError}</small>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
            <button type="submit" className="btn btn-danger"> <i className="fa fa-user-plus"></i> Register </button>
                                </div>
                            </div>
                            </form>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            )
    }
}

export default Register;