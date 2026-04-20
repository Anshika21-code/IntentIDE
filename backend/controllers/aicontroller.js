const processAIRequest = async (req, res) => {
  try {
    const { prompt, files } = req.body;

    // For now, just return a mock response
    res.json({
      success: true,
      message: "AI request received (backend ready)",
      data: {
        suggestion: "This feature will be connected to Claude / Grok / GPT soon",
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = { processAIRequest };