const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
    due: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Not Completed', 'In progress', 'Completed'],
        default: 'Not Completed'
    },
   
});

module.exports = noteSchema;
