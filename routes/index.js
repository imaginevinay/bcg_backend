const express = require('express');
const router = express.Router();

// base route for testing server
router.get('/', (req,res) => {
    res.send('Hello')
})

module.exports = router;