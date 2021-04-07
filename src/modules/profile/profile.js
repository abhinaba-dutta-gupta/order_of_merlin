import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../profile/styles.css';
import background from '../../images/background.jpg';
import { Tab, Tabs, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Modal from '../../components/modal/modal';
import Table from 'react-bootstrap/Table';
import { withRouter } from "react-router-dom";
import AppbarLogin from '../../components/appbarLogin/appbarLogin';


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            show: false,
            panelOpen: false
        }
    }

    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    }

    redirectToDashboard = () => {
        const { history } = this.props;
        if (history) history.push('/dashboard');
    }

    redirectToProfile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
    }
    
    confirm = () => {
        alert("Profile Updated Successfully!");
    }

    openPanel = () => {
        this.setState({
            panelOpen: !this.state.panelOpen
        })
    }

    closePanel = () => {
        this.setState({
            panelOpen: false
        })
    }

    render() {

        let panelClasses = 'side-panel'
        if (this.state.panelOpen) {
            panelClasses = 'side-panel open'
        }
        
        return (
            <div className='container' style={{ backgroundImage: `url(${background})` }}>
                <AppbarLogin>
                    <Tabs
                        indicatorColor="primary"
                        textColor="white"
                        aria-label="disabled tabs example">
                        <Tab label="Dashboard" onClick={this.redirectToDashboard} />
                        <Tab label="Profile" onClick={this.redirectToProfile} />
                    </Tabs>
                    <IconButton onClick={this.openPanel}><AccountCircle style={{ color: 'white' }} /></IconButton>
                </AppbarLogin>

                <br></br>
                <h1 className='title' >Profile</h1>
                <br></br>
                <div className='table-div'>
                    <Table striped bordered hover variant="dark">
                        <tr>
                            <td>Name</td>
                            <td>Panchuuuuuu</td>
                        </tr>
                        <tr>
                            <td>EmailID</td>
                            <td>abc@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Associate ID</td>
                            <td>856778</td>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <td>12345</td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>******</td>
                        </tr>
                    </Table>
                </div>
                <br></br>
                <button onClick={e => { this.showModal(e) }}>Edit Profile</button>

                <div className={panelClasses}>
                    <h3 onClick={this.redirectToSignin}>Logout</h3>
                </div>

                <Modal onClose={this.showModal} show={this.state.show}>
                    <h1 className='title' > Edit Profile </h1>
                    <div class="article-container">
                        <div class="article">
                            <p><TextField id="filled-basic" required='required' size='small' label="Associate Name" variant="filled" /></p>
                            <p><TextField id="filled-basic" required='required' type='e-mail' size='small' label="Email-ID" variant="filled" /></p>
                        </div>
                        <div class="article">
                            <p><TextField id="filled-basic" type='number' size='small' label="Phone number" variant="filled" /></p>
                            <p><TextField id="filled-basic" required='required' size='small' label="Associate ID" variant="filled" /></p>
                        </div>
                    </div>
                    <p><TextField id="filled-basic" required='required' type='password' size='small' label="Password" variant="filled" /></p>
                    <button onClick={this.confirm}>Submit</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Profile);