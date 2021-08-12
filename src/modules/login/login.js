import React, { Component } from 'react';
import '../login/styles.css';
import background from '../../images/background.webp';
import { TextField, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Email, Lock } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
// import Appbar from '../../components/appbar/appbar';
import { login } from '../../api/auth';
import logo from '../../images/logo.png';


class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Password Validation
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "! Password cannot be empty";
        }

        if (!(fields["password"].length >= 4 && fields["password"].length <= 8)) {
            formIsValid = false;
            errors["password"] = "! Password length must be 4-8 characters";
        }

        //Email Validation
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "! Email cannot be empty";
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

    contactSubmit(e) {
        e.preventDefault();
        let fields = this.state.fields;

        if (this.handleValidation()) {
            const userLogin = {
                email: fields["email"],
                password: fields["password"],
            }
            login(userLogin).then(res => {
                console.log(res);
                this.redirectToDashboard();
            });
        }
    }


    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    redirectToDashboard = () => {
        const { history } = this.props;
        if (history) history.push('/dashboard');
    }

    render() {
        return (
            <div className="main-container">
                <div style={{ background: '#80cbce' }}>
                    <img
                        className='logo-login'
                        src={logo}
                        alt="Logo"
                    />
                    <h1 className="brand-login">Questionnaire</h1>
                </div>
                <div className='container' style={{ backgroundImage: `url(${background})`, backgroundSize: 'contain' }}>
                    {/*<Appbar></Appbar>*/}
                    <div id="arrow"></div>
                    <div className='paper-login'>
                        <div className="card-head-login"><h1 className='card-title-login'><IconButton><Lock style={{ color: '#1f2833' }} /></IconButton>Login here</h1></div>
                        <br></br>
                        <form onSubmit={this.contactSubmit.bind(this)}>
                            <p>
                                <IconButton><Email style={{ color: 'grey' }} /></IconButton>
                                <TextField required='required' type='e-mail' size='small' label="Email-ID" variant="standard" onChange={this.handleChange.bind(this, "email")} />
                            </p>
                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            <p>
                                <IconButton><Lock style={{ color: 'grey' }} /></IconButton>
                                <TextField required='required' type='password' size='small' label="Password" variant="standard" onChange={this.handleChange.bind(this, "password")} />
                            </p>
                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                            <br></br>
                            <p><button className='submit-btn-login' type='submit'>Submit</button></p>
                        </form>
                        <div style={{ alignContent: 'left' }}>
                            <p>Do not have an account?&nbsp;<Link to="./signup">REGISTER</Link></p>
                            <Link to='./forgotpass'>Forgot password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Signin);