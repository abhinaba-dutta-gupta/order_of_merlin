const router = require('express');
const users = router.Router();
const userSchemaaa = require('../../schema/userschema');
const cors = require('cors');


users.use(cors());


users.route('/editProfile').post((req, res) => {

    userSchemaaa.findOne({
        associateid: req.body.associateid
    })
        .then(user => {
            if (user) {
                user.email = req.body.email;
                user.name = req.body.name;
                user.phone = req.body.phone;
                user.personalQuestion = req.body.personalQuestion;

                user.save();
                res.json(user);
                res.status(200).json({ user: 'User successfully edited' })
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