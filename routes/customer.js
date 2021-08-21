const express = require('express');
const router = express.Router();
const Policies = require('../models/policy');


//get one policy by policyID
router.get('/:customerID', (req, res) => {
    const cust_id = req.params.customerID.toString();
    Policies.findOne({ "Customer_id": cust_id }).exec().then(data => {
        data = data ? [data] : [];
        res.status(200).send(data);
    }).catch(err => {
        console.log('err', err);
        res.status(500).send({ error: err })
    })
})




module.exports = router;