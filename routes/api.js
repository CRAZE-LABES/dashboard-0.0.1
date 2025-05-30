const express = require('express');
const axios = require('axios');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// Server control endpoints
router.post('/server/:id/start', isAuthenticated, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PANEL_URL}/api/client/servers/${req.params.id}/power`,
      { signal: 'start' },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PANEL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({ success: true, message: 'Server started' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start server' });
  }
});

router.post('/server/:id/stop', isAuthenticated, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PANEL_URL}/api/client/servers/${req.params.id}/power`,
      { signal: 'stop' },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PANEL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({ success: true, message: 'Server stopped' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to stop server' });
  }
});

router.post('/server/:id/restart', isAuthenticated, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PANEL_URL}/api/client/servers/${req.params.id}/power`,
      { signal: 'restart' },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PANEL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({ success: true, message: 'Server restarted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to restart server' });
  }
});

// Get server stats
router.get('/server/:id/stats', isAuthenticated, async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PANEL_URL}/api/client/servers/${req.params.id}/resources`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PANEL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch server stats' });
  }
});

module.exports = router;
