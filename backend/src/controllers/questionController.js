// Step 1: Import the model
const Question = require('../models/questionSchema');

// Step 2: Export the controller function
exports.createQuestion = async (req, res) => {
  try {
    // Step 3: Fetch data from request body
    const { questionText, options, correctOption, createdBy, level } = req.body;

    // Step 4: Validate required fields
    if (!questionText || !options || !correctOption || !createdBy || !level) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Step 5: Create a new question object
    const question = new Question({
      questionText,
      options,
      correctOption,
      createdBy,
      level
    });

    // Step 6: Save the question in the database
    await question.save();

    // Step 7: Send a success response
    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question
    });

  } catch (error) {
    // Step 8: Handle errors and send failure response
    res.status(500).json({
      success: false,
      message: "Error creating question",
      error: error.message
    });
  }
};
