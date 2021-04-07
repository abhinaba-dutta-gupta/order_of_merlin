const router = require('express');
const users = router.Router();
const userSchemaaa = require('../../schema/userschema');
const cors = require('cors');
const bcrypt = require('bcrypt');

users.use(cors());

users.route('/getAll').get((req, res) => {
    userSchemaaa.find()
        .then(signup => {
            res.json(signup);
        })
        .catch(err => res.status(400).json('error: ' + err));
});

users.route('/signup').post((req, res) => {

    var userData = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        associateid: req.body.associateid,
        interviewsno: req.body.interviewsno,
        personalQuestion: req.body.personalQuestion
    }
    userSchemaaa.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    userSchemaaa.create(userData)
                        .then(user => {
                            console.log(user);
                            res.status(200).json({ user: 'User added' })
                        })
                        .catch(err => {
                            res.send('error esechhe: ' + err)
                        })
                })
                    
            }
            else {
                res.json({
                    error: 'User already exist'
                })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});


module.exports = users;


