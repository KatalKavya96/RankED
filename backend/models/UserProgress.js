const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: String,
  solvedQuestions: [String],
  bookmarkedQuestions: [String],
  submissionLog: Object,
  correctSubmissions: Number
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
