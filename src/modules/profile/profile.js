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
            panelOpen: false,
            fields: {},
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //PhoneNumber Validation
        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "! Field cannot be empty";
        }

        if (!(fields["phone"].length === 10 && fields["phone"].match(/^[0-9]+$/))) {
            formIsValid = false;
            errors["phone"] = "! Invalid phone number";
        }

        //AssociateID Validation
        if (!fields["associateid"]) {
            formIsValid = false;
            errors["associateid"] = "! Password cannot be empty";
        }

        if (!(fields["associateid"].length === 6 && fields["associateid"].match(/^[0-9]+$/))) {
            formIsValid = false;
            errors["associateid"] = "! Invalid Associate ID";
        }

        //PersonalQuestion Validation
        if (!fields["personalQuestion"]) {
            formIsValid = false;
            errors["personalQuestion"] = "! Field cannot be empty";
        }

        if (!(fields["personalQuestion"].length > 0 && fields["personalQuestion"].length <= 20 && fields["name"].match(/^[a-zA-Z]+$/))) {
            formIsValid = false;
            errors["personalQuestion"] = "! Invalid Associate ID";
        }

        //Password Validation
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "! Field cannot be empty";
        }

        if (!(fields["password"].length >= 4 && fields["password"].length <= 8)) {
            formIsValid = false;
            errors["password"] = "! Password length must be 4-8 characters";
        }

        //Email Validation
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "! Field cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
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

    changeHandler = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
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
                    <div class="article-container">
                        <div class="article">
                            <p>
                                <TextField id="standard-basic" size='small' defaultValue={this.state.name} label="Associate Name" variant="standard" onChange={this.changeHandler.bind(this, "name")} />
                            </p>
                            <p>
                                <TextField id="standard-basic" type='e-mail' defaultValue={this.state.email} size='small' label="Email-ID" variant="standard" onChange={this.changeHandler.bind(this, "email")} />
                            </p>
                        </div>
                        <div class="article">
                            <p>
                                <TextField id="standard-basic" type='text' defaultValue={this.state.phone} size='small' label="Phone number" variant="standard" onChange={this.changeHandler.bind(this, "phone")} />
                            </p>
                            <p>
                                <TextField id="standard-basic" size='small' defaultValue={this.state.associateid} label="Associate ID" variant="standard" onChange={this.changeHandler.bind(this, "associateid")} />
                            </p>
                        </div>
                    </div>
                    <p>
                        <TextField id="standard-basic" size='small' defaultValue={this.state.personalQuestion} label="Personal Question" variant="standard" onChange={this.changeHandler.bind(this, "personalQuestion")} />
                    </p>
                    <button onClick={this.confirm}>Submit</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Profile);