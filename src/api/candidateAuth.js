import axios from 'axios';

export const addCandidate = newCandidate => {
    return axios.post('candidates/addCandidate', {
        name: newCandidate.name,
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
