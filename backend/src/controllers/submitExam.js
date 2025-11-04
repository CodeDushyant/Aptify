const Exam = require('../models/examSchema');
const ExamResult = require('../models/resultSchema');

exports.submitExam = async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    // check exam and answers
    if (!studentId || !examId || !answers) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // get the exam questions
    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      return res.status(404).json({ success: false, message: "Exam not found" });
    }

    // calculate score
    let score = 0;
    exam.questions.forEach((q, i) => {
      if (answers[i] && answers[i].trim() === q.correctOption.trim()) {
        score++;
      }
    });

    // save or update result
    const result = await ExamResult.findOneAndUpdate(
      { studentId, examId },
      { marks: score },
      { new: true, upsert: true }
    );

    // return score immediately
    res.status(200).json({
      success: true,
      message: "Exam submitted successfully",
      marks: score,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting exam",
      error: error.message,
    });
  }
};
