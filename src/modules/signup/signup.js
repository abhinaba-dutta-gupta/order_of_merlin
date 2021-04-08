import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../signup/styles.css';
import background from '../../images/background.jpg';
import { IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import { AccountBox, PhoneAndroid, Email, CardTravel, Lock, Person, Security } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import Appbar from '../../components/appbar/appbar';
import { signup } from '../../api/auth';

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      email: '',
      name: '',
      phone: '',
      password: '',
      associateid: '',
      personalQuestion: ''
    }
  }

  showModal = e => {
    const userRegistration = {
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      password: this.state.password,
      associateid: this.state.associateid,
      //interviewsno: this.state.interviewsno,
      personalQuestion: this.state.personalQuestion
    }
    signup(userRegistration).then(res => {
      this.setState({
        show: !this.state.show
      });
    })

  }
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  redirectToSignin = () => {
    const { history } = this.props;
    if (history) history.push('/');
  }

  render() {

    return (
      <div className='container' style={{ backgroundImage: `url(${background})` }}>
        <Appbar></Appbar>
        <div className='paper-small'>
          <div className="card-head"><h1 className='card-title'><IconButton><AccountBox style={{ color: 'white' }} /></IconButton>Register here</h1></div>
          <p>
            <IconButton><Person style={{ color: 'grey' }} /></IconButton>
            <TextField required='required' size='small' name="name" label="Associate Name" variant="standard" value={this.state.name} onChange={this.changeHandler} />
          </p>
          <p>
            <IconButton><Email style={{ color: 'grey' }} /></IconButton>
            <TextField required='required' type='e-mail' size='small' name="email" label="Email-ID" variant="standard" value={this.state.email} onChange={this.changeHandler} />
          </p>
          <p>
            <IconButton><PhoneAndroid style={{ color: 'grey' }} /></IconButton>
            <TextField type='number' size='small' name="phone" label="Phone number" variant="standard" value={this.state.phone} onChange={this.changeHandler} />
          </p>
          <p>
            <IconButton><CardTravel style={{ color: 'grey' }} /></IconButton>
            <TextField required='required' size='small' name="associateid" label="Associate ID" variant="standard" value={this.state.associateid} onChange={this.changeHandler} />
          </p>
          <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton>
            <TextField required='required' type='password' name="password" size='small' label="Password" variant="standard" value={this.state.password} onChange={this.changeHandler} />
          </p>
          <p>
            <IconButton><Security style={{ color: 'grey' }} /></IconButton>
            <TextField required='required' type='personal-question' size='small' name="personalQuestion" label="Mother's maiden name" variant="standard" value={this.state.personalQuestion} onChange={this.changeHandler} />
          </p>
          <button onClick={e => { this.showModal(e) }}>Submit</button>
        </div>
        <Modal onClose={this.showModal} show={this.state.show}>
          <p>Your account has been created Successfully! A confirmation mail has been sent to your registered e-mail.</p>
          <button onClick={this.redirectToSignin}>Back to Login</button>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Signup);