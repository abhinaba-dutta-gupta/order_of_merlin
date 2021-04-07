import { Component } from "react";
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../../images/logo.png';
import '../appbarLogin/appbarLogin.css';
import { withRouter } from 'react-router-dom';

class AppbarLogin extends Component {
    render() {
        return (
            <div>
                <AppBar className='head' position="static" style={{ background: '#008099', padding: '0.5%' }}>
                    <Toolbar>
                        <img
                            className='logo'
                            src={logo}
                            alt="Logo"
                        />
                        <h1 className="brand">Questionnaire</h1>
                        {this.props.children}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(AppbarLogin);