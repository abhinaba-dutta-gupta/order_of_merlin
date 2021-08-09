import { Component } from "react";
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../../images/logo.png';
import '../appbarLogin/appbarLogin.css';
import { withRouter } from 'react-router-dom';

class AppbarLogin extends Component {
    render() {
        return (
            <div>
                <AppBar className='head' position="static" style={{ background: '#008099', padding: '10px', position: 'relative' }}>
                    <Toolbar style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <img
                            className='logo-appbar-login'
                            src={logo}
                            alt="Logo"
                        />
                        <h1 className="brand-appbar-login">Questionnaire</h1>
                        {this.props.children}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(AppbarLogin);