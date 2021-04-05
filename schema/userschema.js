const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchemaa = new Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    associateid:{
        type: String,
        required: true
    },
    interviewsno:{
        type: String,
        required: true
    }
});

module.exports = userSchemaaa = mongoose.model('users', userSchemaa);