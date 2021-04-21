const router = require('express');
const candidates = router.Router();
const candidateSchemaaa = require('../../schema/candidateschema');
const cors = require('cors');
// const candidateschema = require('../../schema/candidateschema');

candidates.use(cors());

candidates.route('/getAllCandidates').get((req, res) => {
    candidateSchemaaa.find()
        .then(allCandidate => {
            console.log(allCandidate);
            res.json(allCandidate);
        })
        .catch(err => {
            res.json(err);
            res.status(400).json('error: ' + err)
         } );
});

candidates.route('/addCandidate').post((req, res)=>{
    var candidateData = {
        candidateName: req.body.candidateName,
        stream: req.body.stream,
        institute: req.body.institute,
        associateid: req.body.associateid
    }
    candidateSchemaaa.findOne({
        candidateName: req.body.candidateName
    })
    .then(candidate=>{
        if(!candidate){
            candidateSchemaaa.create(candidateData)
            .then(candidate=>{
                res.json(candidate);
                res.status(200).json({candidate: 'Candidate Added'});
            })
            .catch(err=>{
                res.json("error "+err);
            })
        }
        else{
            res.json({
                error: 'Candidate already exist'
            })
        }
    })
    .catch(err=>{
        res.json({
            error: 'Errors!!!!!!!'
        })
})

})


module.exports = candidates;