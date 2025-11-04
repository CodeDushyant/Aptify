// import models of ranking
const Result = require('../models/resultSchema');
const User = require('../models/userSchema');




exports.getAllRanking = async (req, res) => {
  try {
    // sirf students ko fetch karte hain aur marks ke basis pe sort karte hain
    const students = await User.find({ role: "Student" })
      .sort({ marks: -1 }); // high to low

    // rank assign karte hain dynamically
    let rank = 1;
    const rankedStudents = students.map(s => ({
      rank: rank++,
      name: s.name,
      email: s.email,
      marks: s.marks,
    }));

    res.status(200).json({
      success: true,
      message: "Ranking fetched successfully",
      data: rankedStudents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching rankings",
      error: error.message,
    });
  }
};
