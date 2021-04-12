const router = require('express');
const users = router.Router();
const userSchemaaa = require('../../schema/userschema');
const cors = require('cors');
const bcrypt = require('bcrypt');

users.use(cors());


users.route('/forgotPass').post((req, res) => {
    // const userData = {
    //     password: req.body.password
    // }
    userSchemaaa.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (user.personalQuestion === req.body.personalQuestion) {
                    //res.status(200).json({ user: 'User exist' })
                    if (req.body.password === req.body.confirmPassword) {
                        user.password = req.body.password;
                        bcrypt.hash(user.password, 10, (err, hash) => {
                            user.password = hash
                            user.save();
                            res.status(200).json({ user: 'User exists' })
                        })

                    }
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