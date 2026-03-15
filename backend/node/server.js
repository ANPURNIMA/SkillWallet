const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');
require('dotenv').config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3001;
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:8000';

app.use(cors());
app.use(express.json());

const upload = multer();

/**
 * GET /api/dashboard
 * Returns project status and epics workflow.
 */
app.get('/api/dashboard', (req, res) => {
  res.json({
    status: "90% complete",
    epics: [
      { id: 1, title: "Environment Setup", completed: true },
      { id: 2, title: "Backend API Layer", completed: true },
      { id: 3, title: "AI Integration", completed: true },
      { id: 4, title: "React Frontend", completed: true },
      { id: 5, title: "Testing/Deployment", completed: false }
    ]
  });
});

/**
 * POST /api/evaluate-request
 * Acts as a proxy, forwarding resume data to the Python FastAPI service.
 */
app.post('/api/evaluate-request', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing resume file" });
    }

    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Connecting to Python service using axios
    const response = await axios.post(`${PYTHON_API_URL}/analyze`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error connecting to Python service:", error.message);
    res.status(500).json({ error: "Could not reach AI analysis service" });
  }
});

app.listen(port, () => {
  console.log(`Node.js Express backend running at http://localhost:${port}`);
});