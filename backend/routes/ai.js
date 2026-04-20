const express = require('express');
const router = express.Router();
const { processAIRequest } = require('../controllers/aicontroller');

// Placeholder for future AI features
router.post('/optimize', processAIRequest);
router.post('/explain', processAIRequest);
router.post('/decision', processAIRequest);

module.exports = router;