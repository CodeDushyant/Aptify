const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, 
  level: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'difficult']
  }
});

module.exports = mongoose.model("Question", questionSchema);
