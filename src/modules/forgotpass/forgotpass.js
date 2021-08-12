import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../forgotpass/styles.css';
import background from '../../images/background.webp';
import { IconButton } from '@material-ui/core';
import Modal from '../../components/modal/modal';
import { Mail, LockOpen, Security, Lock } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
// import Appbar from '../../components/appbar/appbar';
import { forgetPassword } from '../../api/auth';
import logo from '../../images/logo.png';


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

        if (!(fields["password"] === fields["confirmPassword"])) {
            formIsValid = false;
            errors["confirmPassword"] = "Passwords should be same";
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
        let fields = this.state.fields;

        if (this.handlePasswordValidation()) {
            const userLogin = {
                email: fields["email"],
                personalQuestion: fields["personalQuestion"],
                password: fields["password"],
                confirmPassword: fields["confirmPassword"]
            }
            forgetPassword(userLogin)
                .then(res => {
                    this.redirectToSignin();
                    console.log(res);
                });
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
        if (history) history.push('/login');
    }

    render() {

        return (
            <div className="main-container">
            <div style={{ background: '#80cbce' }}>
                    <img
                        className='logo-forgotpass'
                        src={logo}
                        alt="Logo"
                    />
                    <h1 className="brand-forgotpass">Questionnaire</h1>
                </div>
                <div className='container' style={{ backgroundImage: `url(${background})`, backgroundSize: 'contain' }}>
                    {/*<Appbar></Appbar>*/}
                    <div id="arrow"></div>
                    <div className='paper-forgotpass'>
                        <div className="card-head-forgotpass"><h1 className='card-title-forgotpass'><IconButton><LockOpen style={{ color: '#1f2833' }} /></IconButton>Forgot Password</h1></div>
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
                            <p><button className='submit-btn-forgotpass' type='submit'>Submit</button></p>
                        </form>
                    </div>

                    <Modal onClose={this.showModal} show={this.state.show}>

                        <h1 className='title' > Reset Password </h1>
                        <br></br>
                        <form onSubmit={this.contactPasswordSubmit.bind(this)}>
                            <div class="article-container">
                                <div class="article">
                                    <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton>
                                        <TextField id="filled-basic" required='required' type='password' size='small' label="New Password" variant="standard" onChange={this.handleChange.bind(this, "password")} /></p>
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                </div>
                                <div class="article">
                                    <p><IconButton><Lock style={{ color: 'grey' }} /></IconButton>
                                        <TextField id="filled-basic" required='required' type='password' size='small' label="Confirm New Password" variant="standard" onChange={this.handleChange.bind(this, "confirmPassword")} /></p>
                                    <span style={{ color: "red" }}>{this.state.errors["confirmPassword"]}</span>
                                </div>
                            </div>
                            <br></br>
                            <button type='submit'>Submit</button>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);