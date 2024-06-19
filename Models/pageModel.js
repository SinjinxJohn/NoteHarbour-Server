const mongoose = require('mongoose');
// const noteSchema = require('./noteSchema');

const pageSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'NotesModel'
    }]
})
const pagemodel = mongoose.model('PageModel',pageSchema);
module.exports = pagemodel;
// module.exports = pageSchema;