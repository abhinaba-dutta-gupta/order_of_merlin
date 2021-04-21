const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const candidateSchemaa = new Schema({

    name:{
        type: String,
        required: true
    },
    stream:{
        type: String,
        required: true
    },
    associateid:{
        type: String
    },
    institute:{
        type: String,
        required: true
    },
    points:{
        type: String
    },
    remarks:{
        type: String
    },
    selectionstatus:{
        type: String
    }
});

module.exports = candidateSchemaaa = mongoose.model('candidates', candidateSchemaa);