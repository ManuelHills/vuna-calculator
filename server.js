const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (your HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Health check endpoint — Docker and your CI/CD pipeline use this
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'VUNA Calculator',
    timestamp: new Date().toISOString()
  });
});

// Serve the calculator homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Export app for testing (important — tests import this file)
module.exports = app;

// Only start the server if this file is run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`VUNA Calculator running at http://localhost:${PORT}`);
  });
}
