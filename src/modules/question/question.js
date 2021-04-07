import React, { Component } from 'react';
import '../question/styles.css';
import background from '../../images/background.jpg';
import { IconButton, Grid, Tabs, Tab, TextField, Slider } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Scrollbars } from 'rc-scrollbars';
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


                <div className='paper'>
                    <div id='triangle'></div>

                    <div class="article-container">
                        <div class="article">
                            <h2>Question</h2>
                            <Scrollbars class="scroll" style={{ width: '400px', height: '150px' }}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </Scrollbars>
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
                        <div class="article">
                            <h2>Answer</h2>
                            <Scrollbars style={{ width: '400px', height: '150px' }}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </Scrollbars>
                            <p>Keywords : Word, Word, word</p>
                            <br></br>
                            <p>Marks :</p>
                            <br></br>
                            <Slider className="slider" max={10} min={0} step={1} defaultValue={0} valueLabelDisplay="on"
                                value={this.state.value}
                                onChange={this.handleChange}
                                onDragStop={this.handleDragStop}
                                style={{ color: '#002233' }} ></Slider>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="button-group">
                        <Grid container spacing={10} justify='center' alignItems='center'>
                            <Grid item><button>Skip Question</button></Grid>
                            <Grid item><button>Next Question</button></Grid>
                            <Grid item><button onClick={this.redirectToCandidate}>Finish Interview</button></Grid>
                        </Grid>
                    </div>
                </div>
                <div className={panelClasses}>
                    <h3 onClick={this.redirectToSignin}>Logout</h3>
                </div>
            </div>
        );
    }
}

export default withRouter(Question);