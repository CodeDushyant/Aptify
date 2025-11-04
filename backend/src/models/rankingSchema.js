const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Exam",
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Ranking", rankingSchema);
