import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../signup/styles.css';
import background from '../../images/background.jpg';
import { IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import { AccountBox, PhoneAndroid, Email, CardTravel, Lock, Person, Security } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import Appbar from '../../components/appbar/appbar';


class Signup extends Component {

  state = {
    show: false
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
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
          <p><IconButton><Person style={{ color: 'grey' }} /></IconButton><TextField required='required' size='small' label="Associate Name" variant="standard" /></p>
          <p><IconButton><Email style={{ color: 'grey' }} /></IconButton><TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" /></p>
          <p><IconButton><PhoneAndroid style={{ color: 'grey' }} /></IconButton><TextField type='number' size='small' label="Phone number" variant="standard" /></p>
          <p><IconButton><CardTravel style={{ color: 'grey' }} /></IconButton><TextField required='required' size='small' label="Associate ID" variant="standard" /></p>
          <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton><TextField required='required' type='password' size='small' label="Password" variant="standard" /></p>
          <p><IconButton><Security style={{ color: 'grey' }} /></IconButton><TextField required='required' type='personal-question' size='small' label="Mother's maiden name" variant="standard" /></p>
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