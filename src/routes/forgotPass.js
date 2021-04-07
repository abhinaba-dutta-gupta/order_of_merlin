const router = require('express');
const users = router.Router();
const userSchemaaa = require('../../schema/userschema');
const cors = require('cors');
const bcrypt = require('bcrypt');

users.use(cors());


users.route('/forgotPass').post((req, res) => {

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
                if (bcrypt.compareSync(req.body.personalQuestion, user.personalQuestion)) {
                    console.log(user);
                    res.status(200).json({ user: 'User exist' })

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

module.exports = users;