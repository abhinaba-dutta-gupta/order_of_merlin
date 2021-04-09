import axios from 'axios';


export const signup = newUser => {
    return axios.post('users/signup', {
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone,
            password: newUser.password,
            associateid: newUser.associateid,
            //interviewsno: newUser.interviewsno,
            personalQuestion: newUser.personalQuestion
        })
        .then(res =>{
            console.log(res);
        })
    .catch(error =>{
        console.log(error)
    })
}