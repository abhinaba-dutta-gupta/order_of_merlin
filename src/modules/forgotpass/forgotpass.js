import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../forgotpass/styles.css';
import background from '../../images/background.jpg';
import { IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import { Mail, LockOpen, Security } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import Appbar from '../../components/appbar/appbar';


class ForgotPassword extends Component {

    state = {
        show: false,
        show1: false
    };

    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    }
    showModal1 = e => {
        this.setState({
            show1: !this.state.show1
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
                    <div className="card-head"><h1 className='card-title'><IconButton><LockOpen style={{ color: 'white' }} /></IconButton>Forgot Password</h1></div>
                    <br></br>
                    <br></br>
                    <p><IconButton><Mail style={{ color: 'grey' }} /></IconButton><TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" /></p>
                    <button onClick={e => { this.showModal(e) }}>Submit</button>
                </div>
                <Modal onClose={this.showModal} show={this.state.show}>
                    <p>Answer the security question to reset your password.</p>
                    <p><IconButton>
                        <Security style={{ color: 'grey' }} />
                    </IconButton>
                        <TextField required='required' type='personal-question' size='medium' label="Mother's maiden name" variant="standard" />
                    </p>
                    <button onClick={this.showModal1}>Submit</button>
                </Modal>

                <Modal onClose={this.showModal1} show={this.state.show1}>
                    <h1 className='title' > Reset Password </h1>
                    <br></br>
                    <div class="article-container">
                        <div class="article">
                            <p><TextField id="filled-basic" required='required' type='password' size='small' label="New Password" variant="filled" /></p>
                        </div>
                        <div class="article">
                            <p><TextField id="filled-basic" required='required' type='password' size='small' label="Confirm New Password" variant="filled" /></p>
                        </div>
                    </div>
                    <br></br>
                    <button onClick={this.redirectToSignin}>Submit</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);