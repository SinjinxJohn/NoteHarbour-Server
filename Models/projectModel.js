const mongoose = require('mongoose');
const pageSchema = require('./pageModel');
// const pageModel = require('./pageModel');
// const pageSchema = require('./pageModel');
// const pageModel = require('./pageModel');

const projectSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel', // Reference to the user model
        required: true
    },
    page:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'PageModel',

        }
    ]
    
});
const projectModel = mongoose.model('ProjectModel',projectSchema);
module.exports = projectModel;