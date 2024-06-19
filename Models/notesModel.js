const mongoose = require('mongoose');
const db_link = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.v34jvsb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGO_URL)
    .then(function (db) {
        console.log("db connected");
    })
    .catch(function (err) {
        console.log(err);
    })


const noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    time: {
        start: {
            type: Date,
            // required: true,
            default: function() {
                // Set default end time to 10:30 AM today
                const today = new Date();
                today.setHours(9);
                today.setMinutes(30);
                today.setSeconds(0);
                today.setMilliseconds(0);
                return today;
            }// Start time set to 9:30 AM
        },
        end: {
            type: Date,
            // required: true,
            default:function() {
                // Set default end time to 10:30 AM today
                const today = new Date();
                today.setHours(10);
                today.setMinutes(30);
                today.setSeconds(0);
                today.setMilliseconds(0);
                return today;
            }// End time set to 10:30 AM
        }
    },
    due:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:['Not Completed','In progress','Completed'],
        default:'Not Completed'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    }
});

const notesModel = mongoose.model('NotesModel',noteSchema);
module.exports = notesModel;
// module.export = noteSchema;