import React, { Component } from 'react';
import '../dashboard/styles.css';
import background from '../../images/background.jpg';
import arrow from '../../images/right-arrow.png';
import { IconButton, Typography, Grid, Paper, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Tab, Tabs } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Modal from '../../components/modal/modal';
import { Link, withRouter } from 'react-router-dom';
import { Person, Domain, CallSplit, Keyboard, Menu, AccountCircle } from '@material-ui/icons';
import AppbarLogin from '../../components/appbarLogin/appbarLogin';
import { associate } from '../../api/auth';


class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            value: 0,
            setValue: 0,
            show: false,
            show1: false,
            drawerOpen: false,
            panelOpen: false,
            name: '',
            noOfInterviews: 0
        }
    }

    simpleRating = () => {
        this.setState({ value: 2, setValue: 2 });
    }

    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    }

    showModal1 = e => {
        this.setState({
            show1: !this.state.show1
        });
    }

    handleChange = (event) => {
        this.setState(event.target.value);
    }

    redirectToProfile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
    }

    redirectToDashboard = () => {
        const { history } = this.props;
        if (history) history.push('/dashboard');
    }

    redirectToSubject = () => {
        const { history } = this.props;
        if (history) history.push('/subject');
    }

    redirectToSignin = () => {
        localStorage.removeItem('userData');
        window.location = '/login';
    }

    openDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }

    closeDrawer = () => {
        this.setState({
            drawerOpen: false
        })
    }

    confirm = () => {
        alert("Question Added Successfully!");
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

    // calcInterview = () => {
    //     {this.state.noOfInterviews}
    // }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        this.setState({
            name: user.name
        })
        // window.onpopstate = function () {
        //     alert("Back/Forward clicked!");
        // }
        associate(user.email)
            .then(res => {
                console.log(res);
            })
    }

    render() {

        let drawerClasses = 'side-drawer';
        if (this.state.drawerOpen) {
            drawerClasses = 'side-drawer open';
        }

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
                    <IconButton onClick={this.openDrawer}><Menu style={{ color: 'white' }} /></IconButton>
                </AppbarLogin>
                <br></br>
                <br></br>
                <h1 className='title'>Welcome, {this.state.name}</h1>
                <br></br>
                <br></br>
                <Grid container className='grid' spacing={12} justify='center' alignItems='center'>
                    <Grid item sm={4}><Paper style={{ padding: '5%', backgroundColor: '#002233', cursor: 'pointer', color: 'white' }}>No of interviews
                    <Typography variant='h1'>{this.calcInterview}97</Typography></Paper></Grid>
                </Grid>
                <br></br>
                <br></br>
                <br></br>
                <h1 className='title'>Recent Candidate's Statistics</h1>
                <br></br>
                <br></br>
                <Grid container className='grid' spacing={7} justify='center' alignItems='center'>
                    <Grid item sm={3}>
                        <Paper style={{ padding: '5%', backgroundColor: '#002233', cursor: 'pointer', color: 'white' }}>Washington Shundar
                            <Typography component="legend">Selected</Typography>
                            <Rating
                                name="candidate1"
                                size='large'
                                precision={0.5}
                                value={this.value}
                                onChange={(event, newValue) => {
                                    this.simpleRating(newValue);
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper style={{ padding: '5%', backgroundColor: '#002233', cursor: 'pointer', color: 'white' }}>K.L. Rahul
                            <Typography component="legend">Selected</Typography>
                            <Rating
                                name="candidate2"
                                size='large'
                                precision={0.5}
                                value={this.value}
                                onChange={(event, newValue) => {
                                    this.simpleRating(newValue);
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper style={{ padding: '5%', backgroundColor: '#002233', cursor: 'pointer', color: 'white' }}>M.S. Dhoni
                            <Typography component="legend">Selected</Typography>
                            <Rating
                                name="candidate3"
                                size='large'
                                precision={0.5}
                                value={this.value}
                                onChange={(event, newValue) => {
                                    this.simpleRating(newValue);
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={0}>
                        <Link to='./candidate'><img className='arrow' src={arrow} alt='arrow-button' /></Link>
                    </Grid>
                </Grid>

                <Modal onClose={this.showModal} show={this.state.show}>
                    <h1 className='title'>Create Interview</h1>
                    <p><IconButton><Person style={{ color: 'grey' }} /></IconButton><TextField required='required' id="area-filled-basic" type='string' label="Candidate's Name" variant="standard" /></p>
                    <p><IconButton><Domain style={{ color: 'grey' }} /></IconButton><TextField required='required' id="area-filled-basic" type='string' label="College/University Name" variant="standard" /></p>
                    <p><FormControl className="form">
                        <InputLabel id="demo-simple-select-label"><IconButton><CallSplit style={{ color: 'grey' }} /></IconButton>Choose Stream</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                            <MenuItem value="Elcetronics">EC Engg</MenuItem>
                            <MenuItem value="Computer SC">CS Engg </MenuItem>
                        </Select>
                        <br></br>
                    </FormControl></p>
                    <button onClick={this.redirectToSubject}>Submit</button>
                </Modal>
                <Modal onClose={this.showModal1} show={this.state.show1}>
                    <h1 className='title'>Add a Question</h1>
                    <p><TextareaAutosize id="area-filled-basic" required='required' type='string' placeholder="Question" rowsMin={5} /></p>
                    <p><TextareaAutosize id="area-filled-basic" required='required' type='string' placeholder="Answer" rowsMin={5} /></p>
                    <p><FormControl className="form">
                        <InputLabel id="demo-simple-select-label"><IconButton><CallSplit style={{ color: 'grey' }} /></IconButton>Choose Stream</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="Mechanical">Mechanical</MenuItem>
                            <MenuItem value="Elcetronics">EC Engg</MenuItem>
                            <MenuItem value="Computer SC">CS Engg </MenuItem>
                        </Select>

                    </FormControl></p>
                    <p><IconButton><Keyboard style={{ color: 'grey' }} /></IconButton><TextField id="filled-basic" required='required' type='string' label="Keywords" variant="standard" /></p>
                    <p>Mark Difficulty :
                        <Rating
                            name="difficulty"
                            value={this.value}
                            onChange={(event, newValue) => {
                                this.simpleRating(newValue);
                            }}
                        /></p>
                    <p>Mark Relevance :
                        <Rating
                            name="relevance"
                            value={this.value}
                            onChange={(event, newValue) => {
                                this.simpleRating(newValue);
                            }}
                        /></p>
                    <br></br>
                    <button onClick={this.confirm}>Submit</button>
                </Modal>

                <div className={panelClasses}>
                    <h3 onClick={this.redirectToSignin}>Logout</h3>
                </div>

                <div className={drawerClasses} >
                    <h2 onClick={this.showModal}>Create Interview</h2>
                    <br></br>
                    <br></br>
                    <h2 onClick={this.showModal1}>Add a Question</h2>
                    <br></br>
                    <br></br>
                    <h2>About</h2>
                    <br></br>
                    <br></br>
                    <h2 onClick={this.closeDrawer}>Close</h2>
                </div>

            </div>
        );
    }
}

export default withRouter(Dashboard);