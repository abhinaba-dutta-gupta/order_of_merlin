import axios from 'axios';

export const addCandidate = newCandidate => {
    return axios.post('candidates/addCandidate', {
        candidateName: newCandidate.candidateName,
        institute: newCandidate.institute,
        stream: newCandidate.stream,
        associateid: newCandidate.associateid
    })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
}


export const showCandidates = requiredId =>{
    return axios.post('candidates/getAllCandidatesbyId', {
        associateid: requiredId.associateid
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
}