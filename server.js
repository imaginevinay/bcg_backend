if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path : '.env'})
}
const express = require('express');
const app = express();
const baseRoute = require('./routes/index');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser : true, useUnifiedTopology: true })

const db  = mongoose.connection;
db.on('error', err => console.log(error))
db.once('open', () => console.log("connected to mongoose"));

app.use('/', baseRoute);

app.listen(process.env.PORT || 3000);