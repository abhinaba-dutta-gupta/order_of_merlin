import React, { Component } from 'react';
import '../candidate/styles.css';
import background from '../../images/background.webp';
import { IconButton, Tabs, Tab } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
// import { Rating } from '@material-ui/lab';
// import { TableContainer, Table } from 'react-custom-table';
import { withRouter } from "react-router-dom";
import AppbarLogin from '../../components/appbarLogin/appbarLogin';
import { showCandidates } from '../../api/candidateAuth';
import Profile from '../profile/profile';
import TableRows from '../../components/TableRows/TableRows';

class Candidate extends Component {

    constructor() {
        super()
        this.state = {
            value: 0,
            setValue: 0,
            panelOpen: false,
            associateid: '',
        }
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

    simpleRating = () => {
        this.setState({ value: 2, setValue: 2 });
    }

    redirectToSignin = () => {
        const { history } = this.props;
        if (history) history.push('/');
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

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        this.setState({
            associateid: user.associateid
        })
        const idDetails = {
            associateid: user.associateid
        }
        console.log(idDetails);
        showCandidates(idDetails)
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
            <div className='container' style={{ backgroundImage: `url(${background})`, backgroundSize: 'contain' }}>
                <AppbarLogin>
                    <IconButton onClick={this.openDrawer}><Menu style={{ color: '#1f2833' }} /></IconButton>
                    <IconButton onClick={this.openPanel}><AccountCircle style={{ color: '#1f2833' }} /></IconButton>
                    <Tabs
                        indicatorColor="primary"
                        textColor="white"
                        aria-label="disabled tabs example">
                        <Tab label="Dashboard" onClick={this.redirectToDashboard} />
                    </Tabs>
                </AppbarLogin>

                <div style={{ display: 'grid', justifyItems: 'center' }}>
                    <div id="outer_space">
                        <div id="pencil">
                            <h1 className='title'>Candidate Statistics</h1>
                            <div id="top"></div>
                            <div id="top_border"></div>
                        </div>
                        <div id="bottom">
                            <div id="nib"></div>
                        </div>
                    </div>
                    <div className='pen'>
                        <h1 className='title'>Candidate Statistics</h1>
                    </div>
                </div>

                {/*<div className='table-div'>
                    <div style={{ width: '850px', height: '350px' }}>
                        <TableContainer
                            columns={[
                                { id: "name", title: "Name" },
                                { id: "points", title: "Points" },
                                { id: "remarks", title: "Remarks" },
                                { id: "status", title: "Selection Status" },
                                { id: "date", title: "Date" }
                            ]}
                            rows={[
                                {
                                    id: "1", name: "David Tennant", points: <Rating
                                        name="candidate1"
                                        value={this.value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            this.simpleRating(newValue);
                                        }} />, remarks: "Good", status: "Selected", date: "23/1/21"
                                },
                                {
                                    id: "2", name: "Kelly Jones", points: <Rating
                                        name="candidate2"
                                        value={this.value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            this.simpleRating(newValue);
                                        }} />, remarks: "Average", status: "Not-Selected", date: "29/1/21"
                                },
                            ]} >
                            <Table className='table' />
                        </TableContainer>
                    </div>
                </div>*/}

                <div style={{ display: 'grid', justifyItems: 'center' }}>
                    <TableRows></TableRows>
                    <TableRows></TableRows>
                    <TableRows></TableRows>
                </div>

                {/*<div><Pagination className='page' count={5} size="large" variant="text" shape="rounded" color="primary" /></div>*/}

                <button className='exit-btn' onClick={this.redirectToSignin}>Exit App</button>

                <div className={panelClasses}>
                    <Profile></Profile>
                </div>

                <div className={drawerClasses} >
                    <h2 onClick={this.showModal}>Create Interview</h2>

                    <h2 onClick={this.showModal1}>Add a Question</h2>

                    <h2>About</h2>

                    <h2 onClick={this.closeDrawer}>Close</h2>
                </div>
            </div>
        );
    }
}

export default withRouter(Candidate);