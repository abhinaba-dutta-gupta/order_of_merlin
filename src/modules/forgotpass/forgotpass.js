import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../forgotpass/styles.css';
import background from '../../images/background.jpg';
import { AppBar, IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import logo from '../../images/logo.png';
import { Mail, LockOpen } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';



class ForgotPassword extends Component {
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
                    <img
                        className='logo'
                        src={logo}
                        alt="Logo"
                    />
                    <h1 onClick={this.redirectToSignin}>Questionnaire</h1>
                </AppBar>

                <div className='paper-small'>
                    <div className="card-head"><h1 className='card-title'><IconButton><LockOpen style={{ color: 'white' }} /></IconButton>Forgot Password</h1></div>
                    <br></br>
                    <br></br>
                    <p><IconButton><Mail style={{ color: 'grey' }} /></IconButton><TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" /></p>
                    <button onClick={e => { this.showModal(e) }}>Submit</button>
                </div>
                <Modal onClose={this.showModal} show={this.state.show}>
                    <p>A mail has been sent to your registered e-mail. Follow the instructions to reset your password.</p>
                    <button onClick={this.redirectToSignin}>Back to Login</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);