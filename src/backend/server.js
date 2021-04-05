const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
.connect('mongodb://127.0.0.1:27017/qustionnaire', {useNewUrlParser:true}, { useUnifiedTopology: true })
.catch(e =>{
    console.log('Connection Error', e.message)
})

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Mongo connected");
})

db.on('error', console.error.bind(console, 'MongoDB connection error'))


app.listen(port, () => console.log(`Listening on port ${port}.`));