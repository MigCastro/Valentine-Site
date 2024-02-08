const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define constants for API endpoints
const YOUR_CHATGPT_API_ENDPOINT = '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';
const YOUR_GIPHY_API_KEY = 'Ju3WKEo6cVeTplTLIoeLPIpVflPE3iBQ';

// Handle GET request for love note
app.get('/loveNote', async (req, res) => {
  try {
    console.log('Received request for love note'); // Debugging line
    const response = await axios.get(YOUR_CHATGPT_API_ENDPOINT);
    console.log('ChatGPT API response:', response.data); // Debugging line
    res.send({ loveNote: response.data.text });
  } catch (error) {
    console.error('Error fetching love note:', error.response.data);
    res.status(500).send('Internal server error');
  }
});

// Handle GET request for random cat image
app.get('/catImage', async (req, res) => {
  try {
    console.log('Received request for cat image'); // Debugging line
    const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${YOUR_GIPHY_API_KEY}&tag=cat`;
    const response = await axios.get(giphyUrl);
    console.log('Giphy API response:', response.data); // Debugging line
    res.send({ catImageUrl: response.data.data.image_original_url });
  } catch (error) {
    console.error('Error fetching cat image:', error.response.data);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
