const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IntentIDE backend is running' })
})

// Later we will add /api/ai/* routes here
// For now this is enough

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`)
})