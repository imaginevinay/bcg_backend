const express = require('express');
const router = express.Router();
const Policies = require('../models/policy');
const { getSegregated } = require('../shared/data-formatte')

// get all policies
router.get('/', (req, res) => {
    Policies.find().exec().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: err })
    })
})

//get all policies by region
router.get('/region/:region', (req, res) => {
    const region = req.params.region;
    Policies.find({ "Customer_Region": region }).exec().then(data => {
        data = getSegregated(data);
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ error: err })
    })
})

//get one policy by policyID or customer id
router.get('/:policyID?/:custID?', (req, res) => {
    const pol_id = req.params && req.params.policyID;
    const cust_id = req.params && req.params.custID;
    let filter = {};
    pol_id && (filter['Policy_id'] = pol_id)
    cust_id && (filter['Customer_id'] = cust_id)
    Policies.findOne(filter).exec().then(data => {
        data = data ? [data] : [];
        res.status(200).send(data);
    }).catch(err => {
        console.log('err', err);
        res.status(500).send({ error: err })
    })
})

// update policy data by id
router.patch('/update/:policyID', (req, res) => {
    const _id = req.params.policyID;
    Policies.findByIdAndUpdate({ "_id": _id }, { $set: req.body }, { runValidators: true, context: 'query', new: true }).exec().then(result => {
        res.status(200).send(result)
    }).catch(err => {
        console.log('err', err);
        res.status(500).send({ error: err })
    });

});


//delete policy data by id (not used on frontend)
router.delete('/:policyID', (req, res) => {
    const id = req.params.policyID;
    res.status(200).send({
        message: 'Deleting policy for ID',
        id: id
    });
});


// create policy data (not used on frontend)
router.post('/create', (req, res) => {
    Policies.insertOne(req.body).exec().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({ error: err })
    });
})



module.exports = router;