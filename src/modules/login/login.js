import React, { Component } from 'react';
import '../login/styles.css';
import background from '../../images/background.jpg';
import { AppBar, TextField, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Email, Lock } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';


class Signin extends Component {
    redirectToDashboard = () => {
        const { history } = this.props;
        if (history) history.push('/dashboard');
    }

    render() {
        return (
            <div className='container' style={{ backgroundImage: `url(${background})` }}>
                <AppBar className='head' position="static" style={{ background: '#008099' }}>
                    <img
                        className='logo'
                        src={logo}
                        alt="Logo"
                    />
                    <h1>Questionnaire</h1>
                </AppBar>
                <div className='paper-small'>
                    <div className="card-head"><h1 className='card-title'><IconButton><Lock style={{ color: 'white' }} /></IconButton>Login here</h1></div>
                    <br></br>
                    <form onSubmit={this.redirectToDashboard}>
                        <p><IconButton><Email style={{ color: 'grey' }} /></IconButton><TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" /></p>
                        <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton><TextField required='required' type='password' size='small' label="Password" variant="standard" /></p>
                        <button type='submit'>Submit</button>
                    </form>
                    <div style={{ alignContent: 'left' }}>
                        <p>Do not have an account?&nbsp;<Link to="./signup">REGISTER</Link></p>
                        <Link to='./forgotpass'>Forgot password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Signin);