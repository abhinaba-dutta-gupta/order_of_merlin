import { Component } from "react";
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../../images/logo.png';
import '../appbar/appbar.css';

class Appbar extends Component {
    render() {
        return (
            <div>
                <AppBar className='head' position="static" style={{ background: '#540094', padding: '10px', position: 'relative' }}>
                    <Toolbar>
                        <img
                            className='logo-appbar'
                            src={logo}
                            alt="Logo"
                        />
                        <h1 className="brand-appbar">Questionnaire</h1>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Appbar;