const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Exam",
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Result", resultSchema);
