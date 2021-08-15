import React, { Component } from 'react';
import '../question/styles.css';
import background from '../../images/background.webp';
import { IconButton, Grid, Tabs, Tab, TextField, Slider } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { withRouter } from "react-router-dom";
import AppbarLogin from '../../components/appbarLogin/appbarLogin';


class Question extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            setValue: 0,
            marks: 0,
            label: 0,
            panelOpen: false
        }
    }

    simpleRating = () => {
        this.setState({ value: 2, setValue: 2 });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    handleDragStop = () => {
        this.props.update(this.state.value);
        console.log(this.state.value);
    }

    redirectToDashboard = () => {
        const { history } = this.props;
        if (history) history.push('/dashboard');
    }

    redirectToProfile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
    }

    redirectToCandidate = () => {
        const { history } = this.props;
        if (history) history.push('/candidate');
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

        let panelClasses = 'side-panel';
        if (this.state.panelOpen) {
            panelClasses = 'side-panel open';
        }

        return (
            <div className='container' style={{ backgroundImage: `url(${background})`, backgroundSize: 'contain' }}>
                <AppbarLogin>
                    <IconButton onClick={this.openPanel}><AccountCircle style={{ color: '#1f2833' }} /></IconButton>
                    <Tabs style={{ color: '#1f2833' }}
                        aria-label="disabled tabs example">
                        <Tab label="Dashboard" onClick={this.redirectToDashboard} />
                        <Tab label="Profile" onClick={this.redirectToProfile} />
                    </Tabs>
                </AppbarLogin>


                <div className='paper-question'>

                    <div class="qa-container">
                        <div class="question-block">
                            <h2>Question</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <p>Stream : Computer Science</p>
                            <p>Difficulty : <Rating
                                name="difficulty"
                                value={this.value}
                                onChange={(event, newValue) => {
                                    this.simpleRating(newValue);
                                }}
                            /></p>
                            <p>Relevance : <Rating
                                name="relevance"
                                value={this.value}
                                onChange={(event, newValue) => {
                                    this.simpleRating(newValue);
                                }}
                            /></p>
                            <p>Remarks : <TextField></TextField></p>
                        </div>
                        <hr />
                        <div class="answer-block">
                            <h2>Answer</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <p>Keywords : Word, Word, word</p>
                            <p>Marks :</p>
                            <Slider className="slider" max={10} min={0} step={1} defaultValue={0} valueLabelDisplay="on"
                                value={this.state.value}
                                onChange={this.handleChange}
                                onDragStop={this.handleDragStop}
                                style={{ color: '#002233' }} ></Slider>
                        </div>
                    </div>
                    <div className="button-group">
                        <Grid container spacing={10} justify='center' alignItems='center'>
                            <Grid item><button className='button-question'>Skip Question</button></Grid>
                            <Grid item><button className='button-question'>Next Question</button></Grid>
                            <Grid item><button className='button-question' onClick={this.redirectToCandidate}>Finish Interview</button></Grid>
                        </Grid>
                    </div>
                    <div id='triangle'></div>
                </div>
                <div className={panelClasses}>
                    <h3 onClick={this.redirectToSignin}>Logout</h3>
                </div>
            </div>
        );
    }
}

export default withRouter(Question);