import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  explanation: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  year: { type: Number },
  type: { type: String, default: 'MCQ' },
  source: { type: String, default: 'JEE Main' }
});

export default mongoose.model("Question", questionSchema);
