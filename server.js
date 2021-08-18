if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path : '.env'})
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { urlencoded, json } = require('express');
const morgan = require('morgan');
const baseRoute = require('./routes/index');
const policyRoute = require('./routes/policies');

mongoose.connect(process.env.DB_URL, { useNewUrlParser : true, useUnifiedTopology: true })

const db  = mongoose.connection;
db.on('error', err => console.log(error))
db.once('open', () => console.log("connected to mongoose"));


app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

//TODO: Add CORS path
app.use((req, res, _next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET,PATCH");
        return res.status(200).send({});
    }
    _next();
});

app.use('/', baseRoute);
app.use('/policy', policyRoute);

app.listen(process.env.PORT || 3000);