const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose
.connect('mongodb://127.0.0.1:27017/Questionnaire', {useNewUrlParser:true}, { useUnifiedTopology: true })
.catch(e =>{
    console.log('Connection Error', e.message)
})

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("MongoDB Connected");
})

db.on('error', console.error.bind(console, 'MongoDB connection error'))

var users_sign = require('../routes/signup');
var users_login = require('../routes/login');
var users_pass = require('../routes/forgotPass');
var users_edit = require('../routes/editProfile')


app.use('/users', users_sign);
app.use('/users', users_login);
app.use('/users', users_pass);
app.use('/users', users_edit);

var all_candidate = require('../routes/newCandidate');

app.use('/candidates', all_candidate);

app.listen(port, () => console.log(`Listening on port ${port}.`));