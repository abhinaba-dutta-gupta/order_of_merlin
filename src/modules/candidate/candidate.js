import React, { Component } from 'react';
import '../candidate/styles.css';
import background from '../../images/background.jpg';
import { IconButton, Tabs, Tab } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Rating, Pagination } from '@material-ui/lab';
import { TableContainer, Table } from 'react-custom-table';
import { Scrollbars } from 'rc-scrollbars';
import { withRouter } from "react-router-dom";
import AppbarLogin from '../../components/appbarLogin/appbarLogin';
import {showCandidates} from '../../api/candidateAuth';

class Candidate extends Component {

    constructor() {
        super()
        this.state = {
            value: 0,
            setValue: 0,
            panelOpen: false,
            associateid: ''
        }
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

    redirectToProfile = () => {
        const { history } = this.props;
        if (history) history.push('/profile');
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
    
    componentDidMount = () =>{
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
                console.log(res)
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

                <br></br>
                <h1 className='title'>Candidate Statistics</h1>
                <br></br>
                <br></br>
                <div className='table-div'>
                    <Scrollbars style={{ width: '850px', height: '430px' }}>
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
                                {
                                    id: "3", name: "James McAvoy", points: <Rating
                                        name="candidate3"
                                        value={this.value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            this.simpleRating(newValue);
                                        }} />, remarks: "Very bad", status: "Not-Selected", date: "24/1/21"
                                },
                                {
                                    id: "4", name: "Tim Paine", points: <Rating
                                        name="candidate4"
                                        value={this.value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            this.simpleRating(newValue);
                                        }} />, remarks: "Excellent", status: "Selected", date: "25/1/21"
                                }
                            ]} >
                            <Table className='table' />
                        </TableContainer>
                    </Scrollbars>
                </div>
                <br></br>
                <div><Pagination className='page' count={5} size="large" variant="text" shape="rounded" color="primary" /></div>
                <br></br>
                <button onClick={this.redirectToSignin}>Exit App</button>

                <div className={panelClasses}>
                    <h3 onClick={this.redirectToSignin}>Logout</h3>
                </div>
            </div>
        );
    }
}

export default withRouter(Candidate);