const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',   // Allow frontend
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));   // For sending large code

// Import routes
const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'IntentIDE Backend is running 🚀',
    version: '1.0.0'
  });
});

// Test route for frontend
app.post('/api/test', (req, res) => {
  console.log('Received from frontend:', req.body);
  res.json({
    success: true,
    message: 'Backend received your request successfully!',
    receivedData: req.body,
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});