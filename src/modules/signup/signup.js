import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../signup/styles.css';
import background from '../../images/background.webp';
import { IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import { AccountBox, PhoneAndroid, Email, CardTravel, Lock, Person, Security } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
// import Appbar from '../../components/appbar/appbar';
import { signup } from '../../api/auth';
import logo from '../../images/logo.png';

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      fields: {},
      errors: {}
    }
    this.submitForm = this.submitForm.bind(this);
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //PhoneNumber Validation
    if (!fields["phone"]) {
      formIsValid = false;
      errors["phone"] = "! Field cannot be empty";
    }

    if (!(fields["phone"].length === 10 && fields["phone"].match(/^[0-9]+$/))) {
      formIsValid = false;
      errors["phone"] = "! Invalid phone number";
    }

    //AssociateID Validation
    if (!fields["associateid"]) {
      formIsValid = false;
      errors["associateid"] = "! Password cannot be empty";
    }

    if (!(fields["associateid"].length === 6 && fields["associateid"].match(/^[0-9]+$/))) {
      formIsValid = false;
      errors["associateid"] = "! Invalid Associate ID";
    }

    //PersonalQuestion Validation
    if (!fields["personalQuestion"]) {
      formIsValid = false;
      errors["personalQuestion"] = "! Field cannot be empty";
    }

    if (!(fields["personalQuestion"].length > 0 && fields["personalQuestion"].length <= 20 && fields["name"].match(/^[a-zA-Z]+$/))) {
      formIsValid = false;
      errors["personalQuestion"] = "! Invalid Associate ID";
    }

    //Password Validation
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "! Field cannot be empty";
    }

    if (!(fields["password"].length >= 4 && fields["password"].length <= 8)) {
      formIsValid = false;
      errors["password"] = "! Password length must be 4-8 characters";
    }

    //Email Validation
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "! Field cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    let fields = this.state.fields;

    if (this.handleValidation()) {
      const userRegistration = {
        email: fields["email"],
        name: fields["name"],
        phone: fields["phone"],
        password: fields["password"],
        associateid: fields["associateid"],
        personalQuestion: fields["personalQuestion"]
      }
      signup(userRegistration).then(res => {
        this.showModal(e);
        console.log(res);
      });
    }

  }


  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  }

  submitForm = (event) => {
    event.preventDefault();
  }


  changeHandler = (field, e) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  redirectToSignin = () => {
    const { history } = this.props;
    if (history) history.push('/');
  }

  render() {

    return (
      <div className="main-container">
        <div style={{ background: '#80cbce' }}>
          <img
            className='logo-signup'
            src={logo}
            alt="Logo"
          />
          <h1 className="brand-login">Questionnaire</h1>
        </div>
        <div className='container' style={{ backgroundImage: `url(${background})`, backgroundSize: 'contain' }}>
          {/*<Appbar></Appbar>*/}
          <div id="arrow"></div>
          <div className='paper-signup'>
            <div className="card-head-signup"><h1 className='card-title'><IconButton><AccountBox style={{ color: '#1f2833' }} /></IconButton>Register here</h1></div>
            <form onSubmit={this.contactSubmit.bind(this)}>
              <p>
                <IconButton><Person style={{ color: 'grey' }} /></IconButton>
                <TextField required='required' size='small' name="name" label="Associate Name" variant="standard" value={this.state.name} onChange={this.changeHandler.bind(this, "name")} />
              </p>
              <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
              <p>
                <IconButton><Email style={{ color: 'grey' }} /></IconButton>
                <TextField required='required' type='e-mail' size='small' name="email" label="Email-ID" variant="standard" value={this.state.email} onChange={this.changeHandler.bind(this, "email")} />
              </p>
              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
              <p>
                <IconButton><PhoneAndroid style={{ color: 'grey' }} /></IconButton>
                <TextField type='text' size='small' name="phone" label="Phone number" variant="standard" value={this.state.phone} onChange={this.changeHandler.bind(this, "phone")} />
              </p>
              <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
              <p>
                <IconButton><CardTravel style={{ color: 'grey' }} /></IconButton>
                <TextField required='required' size='small' name="associateid" label="Associate ID" variant="standard" value={this.state.associateid} onChange={this.changeHandler.bind(this, "associateid")} />
              </p>
              <span style={{ color: "red" }}>{this.state.errors["associateid"]}</span>
              <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton>
                <TextField required='required' type='password' name="password" size='small' label="Password" variant="standard" value={this.state.password} onChange={this.changeHandler.bind(this, "password")} />
              </p>
              <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
              <p>
                <IconButton><Security style={{ color: 'grey' }} /></IconButton>
                <TextField required='required' type='text' size='small' name="personalQuestion" label="Mother's maiden name" variant="standard" value={this.state.personalQuestion} onChange={this.changeHandler.bind(this, "personalQuestion")} />
              </p>
              <span style={{ color: "red" }}>{this.state.errors["personalQuestion"]}</span>
              <button className='submit-btn-signup' type="submit">Submit</button>
            </form>
          </div>
          <Modal onClose={this.showModal} show={this.state.show}>
            <p>Your account has been created Successfully! A confirmation mail has been sent to your registered e-mail.</p>
            <button onClick={this.redirectToSignin}>Back to Login</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);