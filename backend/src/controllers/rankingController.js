// import models of ranking
const Ranking = require('../models/rankingSchema');

exports.createRanking = async (req, res) => {
  try {
    const { studentId, examId, score } = req.body;

    // Validation
    if (!studentId || !examId || score == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for ranking",
      });
    }

    // Update if exists, otherwise create new
    const updatedRanking = await Ranking.findOneAndUpdate(
      { studentId, examId },              // search condition
      { score },                          // update new score
      { new: true, upsert: true }         // create if not exists
    );

    res.status(200).json({
      success: true,
      message: "Ranking updated successfully",
      ranking: updatedRanking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating/updating ranking",
      error: error.message,
    });
  }
};
