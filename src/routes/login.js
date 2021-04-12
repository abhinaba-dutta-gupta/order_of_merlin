const router = require('express');
const users = router.Router();
const userSchemaaa = require('../../schema/userschema');
const cors = require('cors');
const bcrypt = require('bcrypt');

users.use(cors());


users.route('/login').post((req, res) => {

    // var userData = {
    //     email : req.body.email,
    //     password : req.body.password
    // }
    userSchemaaa.findOne({
        email: req.body.email
    })
        .then(user => {
            console.log(user);
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log(user);
                    const userDetails = {
                        name: user.name,
                        interviewsno: user.interviewsno
                    }
                    res.status(200).json({ user: 'User exist' });
                    return userDetails;
                }
            }
            else {
                res.json({
                    error: 'User does not exist'
                })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

users.route('/getAssociate').post((req, res) => {
    userSchemaaa.findOne({
        email: req.body.email
    }) 
        .then(signup => {
            res.json(signup);
        })
        .catch(err => res.status(400).json('error: ' + err));
});

module.exports = users;