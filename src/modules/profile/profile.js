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
import { editProfileInfo } from '../../api/auth';


class Profile extends Component {

    constructor() {
        super()
        this.changeHandler = this.changeHandler.bind(this);
        this.editDetails = this.editDetails.bind(this);
        this.state = {
            show: false,
            panelOpen: false,
            name: '',
            email: '',
            associateid: '',
            phone: '',
            personalQuestion: '',
            errors: {}
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

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    redirectToProfile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
    }

    editDetails = (e) => {
        e.preventDefault();
        const userDetails = {
            email: this.state.email,
            name: this.state.name,
            associateid: this.state.associateid,
            phone: this.state.phone,
            personalQuestion: this.state.personalQuestion
        }
        console.log(userDetails);
        editProfileInfo(userDetails)
            .then(res => {
                this.setState({
                    show: false
                })
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        this.setState({
            name: user.name,
            email: user.email,
            associateid: user.associateid,
            phone: user.phone,
            personalQuestion: user.personalQuestion
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
                    <IconButton onClick={this.openPanel}><AccountCircle style={{ color: 'white' }} /></IconButton>
                    <Tabs
                        indicatorColor="primary"
                        textColor="white"
                        aria-label="disabled tabs example">
                        <Tab label="Dashboard" onClick={this.redirectToDashboard} />
                        <Tab label="Profile" onClick={this.redirectToProfile} />
                    </Tabs>
                </AppbarLogin>

                <br></br>
                <h1 className='title'> Profile </h1>
                <br></br>
                <div className='table-div'>
                    <Table striped bordered hover variant="dark">
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Email ID</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>Associate ID</td>
                            <td>{this.state.associateid}</td>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <td>{this.state.phone}</td>
                        </tr>
                        <tr>
                            <td>Personal Question</td>
                            <td>{this.state.personalQuestion}</td>
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
                    <form onSubmit={this.editDetails}>
                        <div class="article-container">
                            <div class="article">
                                <p>
                                    <TextField
                                        id="standard-basic"
                                        name="name"
                                        size='small'
                                        defaultValue={this.state.name}
                                        label="Associate Name"
                                        variant="standard"
                                        onChange={this.changeHandler} />
                                </p>
                                <p>
                                    <TextField
                                        id="standard-basic"
                                        name="email"
                                        size='small'
                                        type='e-mail'
                                        defaultValue={this.state.email}
                                        label="Email-ID"
                                        variant="standard"
                                        onChange={this.changeHandler} />
                                </p>
                            </div>
                            <div class="article">
                                <p>
                                    <TextField
                                        id="standard-basic"
                                        name="phone"
                                        type='text'
                                        defaultValue={this.state.phone}
                                        size='small'
                                        label="Phone number"
                                        variant="standard"
                                        onChange={this.changeHandler} />
                                </p>
                                <p>
                                    <TextField
                                        id="standard-basic"
                                        name="associateid"
                                        size='small'
                                        defaultValue={this.state.associateid}
                                        label="Associate ID"
                                        variant="standard"
                                        onChange={this.changeHandler} />
                                </p>
                            </div>
                        </div>
                        <p>
                            <TextField
                                id="standard-basic"
                                name="personalQuestion"
                                size='small'
                                defaultValue={this.state.personalQuestion}
                                label="Personal Question"
                                variant="standard"
                                onChange={this.changeHandler} />
                        </p>
                        <button type="submit">Submit</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Profile);