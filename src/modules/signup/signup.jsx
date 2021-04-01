import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../signup/styles.css';
import background from '../../images/background.jpg';
import { AppBar, IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import logo from '../../images/logo.png';
import { AccountBox, PhoneAndroid, Email, CardTravel, Lock, Person } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';


class Signup extends Component {
  redirectToSignin = () => {
    const { history } = this.props;
    if (history) history.push('/');
  }

  state = {
    show: false
  };
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div className='container' style={{ backgroundImage: `url(${background})` }}>
        <AppBar className='head' position="static" style={{ background: '#008099' }}>
          <><img
            className='logo'
            src={logo}
            alt="Logo"
          />
            <h1 onClick={this.redirectToSignin}>Questionnaire</h1></>
        </AppBar>

        <div className='paper-small'>
          <div className="card-head"><h1 className='card-title'><IconButton><AccountBox style={{ color: 'white' }} /></IconButton>Register here</h1></div>
          <p><IconButton><Person style={{ color: 'grey' }} /></IconButton><TextField required='required' size='small' label="Associate Name" variant="standard" /></p>
          <p><IconButton><Email style={{ color: 'grey' }} /></IconButton><TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" /></p>
          <p><IconButton><PhoneAndroid style={{ color: 'grey' }} /></IconButton><TextField type='number' size='small' label="Phone number" variant="standard" /></p>
          <p><IconButton><CardTravel style={{ color: 'grey' }} /></IconButton><TextField required='required' size='small' label="Associate ID" variant="standard" /></p>
          <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton><TextField required='required' type='password' size='small' label="Password" variant="standard" /></p>
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