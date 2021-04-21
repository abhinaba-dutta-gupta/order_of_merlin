const router = require('express');
const candidates = router.Router();
const candidateSchemaaa = require('../../schema/candidateschema');
const cors = require('cors');

candidates.use(cors());

candidates.route('/getAllCandidatesbyId').post((req, res) => {
    candidateSchemaaa.find({
        associateid: req.body.associateid
    })
        .then(allCandidate => {
            console.log(allCandidate);
            res.json(allCandidate);
            //res.send();
        })
        .catch(err => {
            res.json(err);
            res.status(400).json('error: ' + err)
         } );
});

module.exports = candidates;