import React, { Component } from 'react';
import '../subject/styles.css';
import background from '../../images/background.jpg';
import logo from '../../images/logo.png';
import electrical from '../../images/lightning.png';
import code from '../../images/coding.png';
import electronics from '../../images/cpu.png';
import physics from '../../images/physics.png';
import { AppBar, IconButton, Toolbar, Tabs, Tab, Grid, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Modal from '../../components/modal/modal';
import { TableContainer, Table } from 'react-custom-table';
import { Scrollbars } from 'rc-scrollbars';
import { withRouter } from "react-router-dom";


class Subject extends Component {

    constructor() {
        super()
        this.state = {
            showbutton: false,
            panelOpen: false
        }
    }
    toggle = () => {
        this.setState({ showbutton: true });
    };

    hideAll = () => {
        this.setState({ showbutton: false });
    };

    state = {
        show: false
    };
    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    };

    handleChange = (event) => {
        this.setState(event.target.value);
    };
    redirectToDashboard = () => {
        const { history } = this.props;
        if (history) history.push('/dashboard');
    }
    redirectToProfile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
    }
    redirectToSignin = () => {
        const { history } = this.props;
        if (history) history.push('/');
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
                <AppBar position="static" className='head' style={{ background: '#008099' }}>
                    <Toolbar>
                        <img
                            className='logo'
                            src={logo}
                            alt="Logo"
                        />
                        <h1 style={{ marginLeft: '44%', position: 'relative' }} onClick={this.redirectToSignin}>Questionnaire</h1>
                        <Tabs
                            indicatorColor="primary"
                            textColor="white"
                            aria-label="disabled tabs example">
                            <Tab label="Dashboard" onClick={this.redirectToDashboard} />
                            <Tab label="Profile" onClick={this.redirectToProfile} />
                        </Tabs>
                        <IconButton onClick={this.openPanel}><AccountCircle style={{ color: 'white' }}/></IconButton>
                    </Toolbar>
                </AppBar>

                <br></br>
                <h1 className='title'>Common Subjects</h1>
                <br></br>
                <div className='table-div'>
                    <Scrollbars style={{ width: '510px', height: '450px' }}>
                        <TableContainer
                            columns={[
                                { id: "icon", title: "" },
                                { id: "name", title: "Name" },
                                { id: "questions", title: "No. of questions" },
                            ]}
                            rows={[
                                { id: "1", icon: <img className='subIcon' src={electrical} alt="icon" />, name: "Basic Electrical", questions: "24" },
                                { id: "2", icon: <img className='subIcon' src={electronics} alt="icon" />, name: "Basic Electronics", questions: "20" },
                                { id: "3", icon: <img className='subIcon' src={physics} alt="icon" />, name: "Physics", questions: "9" },
                                { id: "4", icon: <img className='subIcon' src={code} alt="icon" />, name: "C++/Java", questions: "45" }
                            ]}>
                            <Table className='table' />
                        </TableContainer>
                    </Scrollbars>
                </div>
                <br></br>
                <br></br>
                <div className="button-group">
                    <Grid container spacing={5} className='button-grid'>
                        <Grid item><button onClick={this.showModal}>Choose Subject</button></Grid>
                        <Grid item><button >Random Suggestion</button></Grid>
                        <Grid item><button >Intelligent Suggestion</button></Grid>
                    </Grid>
                </div>

                <div className={panelClasses}>
                    <h3 onClick={this.redirectToSignin}>Logout</h3>
                </div>

                <Modal onClose={this.showModal} show={this.state.show}>
                    <FormControl className="form">
                        <InputLabel id="demo-simple-select-label">Choose Subject</InputLabel>
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
                    </FormControl>
                    <p>Choose RANDOM for random question or choose SUGGESTION for suggestive question.</p>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Subject);