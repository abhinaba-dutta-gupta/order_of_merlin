const router = require('express');
const users = router.Router();
const userSchemaaa = require('../../schema/userschema');
const cors = require('cors');

users.use(cors());


users.route('/login').post((req, res) => {

    // var userData = {
    //     email : req.body.email,
    //     password : req.body.password
    // }
    userSchemaaa.find({
        email: req.body.email,
        password : req.body.password
    })
        .then(user => {
            if (user) {
                    console.log(user);
                    res.status(200).json({user: 'User exist'})
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

module.exports = users;