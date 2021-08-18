const express = require('express');
const router = express.Router();
const Policies = require('../models/policy'); 

// get all policies
router.get('/', (req,res) => {
    Policies.find().exec().then(doc => {
            console.log(doc);
            res.status(200).send(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).send({ error: err })
        })
})

//get one policy by policyID
router.get('/:policyID', (req, res) => {
    const _id = req.params.policyID.toString();
    Policies.findOne({ "_id": _id }).exec().then(doc => {
            res.status(200).send(doc);
        }).catch(err => {
            console.log('err', err);
            res.status(500).send({ error: err })
        })
})

// update policy data by id
router.patch('/:policyID', (req, res) => {
    const _id = req.params.policyID;
    Policies.findByIdAndUpdate({ "_id": _id }, { $set: req.body }, { runValidators: true, context: 'query', new: true }).exec().then(result => {
            res.status(200).send(result)
        }).catch(err => {
            res.status(500).send({ error: err })
        });

});


//delete policy data by id

router.delete('/:policyID', (req, res) => {
    const id = req.params.policyID;
    res.status(200).send({
        message: 'Deleting policy for ID',
        id: id
    });
});



router.post('/create', (req,res) => {
    Policies.insertOne(req.body).exec().then(data => {
        console.log(data);
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ error: err })
    });
})



module.exports = router;