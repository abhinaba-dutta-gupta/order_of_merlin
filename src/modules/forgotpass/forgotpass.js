import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../forgotpass/styles.css';
import background from '../../images/background.jpg';
import { IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import { Mail, LockOpen, Security, Lock } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import Appbar from '../../components/appbar/appbar';


class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            show: false,
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //PersonalQuestion Validation
        if (!fields["personalQuestion"]) {
            formIsValid = false;
            errors["personalQuestion"] = "Cannot be empty";
        }

        if (typeof fields["personalQuestion"] !== "undefined") {
            if (!fields["personalQuestion"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["personalQuestion"] = "Only letters";
            }
        }

        //Email Validation
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
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

    handlePasswordValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Password Validation
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        if (!(fields["password"].length >= 4 && fields["password"].length <= 8)) {
            formIsValid = false;
            errors["password"] = "Password should be between 4-8 characters length";
        }

        if(!(fields["password"] === fields["confirmPassword"])) {
            formIsValid = false;
            errors["password"] = "Passwords should be same";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            this.showModal();
        } 
    }

    contactPasswordSubmit(e) {
        e.preventDefault();

        if (this.handlePasswordValidation()) {
            this.redirectToSignin();
        } 
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    showModal = e => {
        this.setState({
            show: !this.state.show
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
                    <form onSubmit={this.contactSubmit.bind(this)}>
                        <p>
                            <IconButton><Mail style={{ color: 'grey' }} /></IconButton>
                            <TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" onChange={this.handleChange.bind(this, "email")} />
                        </p>
                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                        <p><IconButton><Security style={{ color: 'grey' }} /></IconButton>
                            <TextField required='required' type='text' size='medium' label="Mother's maiden name" variant="standard" onChange={this.handleChange.bind(this, "personalQuestion")} />
                        </p>
                        <span style={{ color: "red" }}>{this.state.errors["personalQuestion"]}</span>
                        <p><button type='submit'>Submit</button></p>
                    </form>
                </div>

                <Modal onClose={this.showModal} show={this.state.show}>
                    <h1 className='title' > Reset Password </h1>
                    <br></br>
                    <div class="article-container">
                        <div class="article">
                            <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton>
                               <TextField id="filled-basic" required='required' type='password' size='small' label="New Password" variant="standard" onChange={this.handleChange.bind(this, "password")} /></p>
                        </div>
                        <div class="article">
                            <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton>
                               <TextField id="filled-basic" required='required' type='password' size='small' label="Confirm New Password" variant="standard" onChange={this.handleChange.bind(this, "confirmPassword")} /></p>
                        </div>
                    </div>
                    <br></br>
                    <button type='submit' onSubmit={this.contactPasswordSubmit.bind(this)} >Submit</button>
                </Modal>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);