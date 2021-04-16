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
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
}

export const login = user => {
    return axios.post('users/login', {
        email: user.email,
        password: user.password,
    })
        .then(res => {
            // if (typeof res.data === 'string') {
            console.log(res);
            localStorage.setItem('userData', JSON.stringify(res.data));
            //     return res.data;
            // }
        })
        .catch(error => {
            console.log(error)
        })
}

export const forgetPassword = user => {
    return axios.post('users/forgotPass', {
        email: user.email,
        personalQuestion: user.personalQuestion,
        password: user.password,
        confirmPassword: user.confirmPassword
    })
        .then(res => {
            console.log(res.config.data);
            // localStorage.setItem('userData', res.config.data);
        })
        .catch(error => {
            console.log(error)
        })
}

export const associate = user => {
    return axios.post('users/getAssociate', {
        email: user.email
    })
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
}
