import { Component } from "react";
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../../images/logo.png';
import '../appbar/appbar.css';

class Appbar extends Component {
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
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Appbar;