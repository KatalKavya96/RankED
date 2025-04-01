import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Add question
router.post('/', async (req, res) => {
  try {
    const q = new Question(req.body);
    await q.save();
    res.status(201).json({ message: "Question added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by subject & chapter
router.get('/', async (req, res) => {
  const { subject, chapter } = req.query;
  try {
    const questions = await Question.find({ subject, chapter });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
