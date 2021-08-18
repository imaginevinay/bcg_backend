const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    "Policy_id": {
        type : Number,
        required : true
    },
    "Date of Purchase":{
        type : String,
        required : true,
        immutable: true
    },
    "Customer_id": {
        type : Number,
        required : true
    },
    "Fuel": {
        type : String,
        required : true
    },
    "VEHICLE_SEGMENT": {
        type : String,
        required : true
    },
    "Premium": {
        type : Number,
        required: [true, 'Premium value is required'],
        min : [500, 'Minimum value for premium is $500'],
        max : [999999, 'Maximum value for premium should be < $1 million']
    },
    "bodily injury liability": {
        type : Number,
        required : true
    },
    "personal injury protection": {
        type : Number,
        required : true
    },
    "property damage liability": {
        type : Number,
        required : true
    },
    "collision": {
        type : Number,
        required : true
    },
    "comprehensive": {
        type : Number,
        required : true
    },
    "Customer_Gender": {
        type : String,
        required : true
    },
    "Customer_Income group": {
        type : String,
        required : true
    },
    "Customer_Region": {
        type : String,
        required : true
    },
    "Customer_Marital_status": {
        type : Boolean,
        required : true
    }
}, { collection: 'policy' });

module.exports = mongoose.model('policy', policySchema);