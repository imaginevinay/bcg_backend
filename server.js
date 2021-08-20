if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { urlencoded, json } = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid')
const fs = require('fs');
const path = require('path');
const baseRoute = require('./routes/index');
const policyRoute = require('./routes/policies');
const customerRoute = require('./routes/customer');

// DB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', err => console.log(error))
db.once('open', () => console.log("connected to mongoose"));


// Morgan unique token generation for every request
morgan.token('id', function getID(req) { return req.id })
app.use(assignID)

//  morgan logging
let logStream = fs.createWriteStream(path.join(__dirname, 'appLogs.log'), { flags: 'a' })
app.use(morgan('dev'));
app.use(morgan(':id :date[iso] HTTP=:http-version Method=:method Status=:status URL=:url', { stream: logStream }))
app.use(urlencoded({ extended: false }));
app.use(json());

// CORS handler
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET,PATCH");
        return res.status(200).send({});
    }
    next();
});

// Routes middleware
app.use('/', baseRoute);
app.use('/policy', policyRoute);
app.use('/customer', customerRoute);


// Error Handling for not found Routes
app.use((req, res, next) => {
    const err = new Error('404 Not Found');
    err.status = 404;
    res.send({
        error: {
            message: err.message
        }
    })
})

// Server ready
app.listen(process.env.PORT || 3000);

// function to generate unique ID
function assignID(req, res, next) {
    req.id = uuidv4();
    next();
}