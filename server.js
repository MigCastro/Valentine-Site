require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define constants for API endpoints
const YOUR_CHATGPT_API_ENDPOINT = process.env.CHATGPT_API_ENDPOINT;
const YOUR_GIPHY_API_KEY = process.env.GIPHY_API_KEY;
// Handle GET request for love note
app.get('/generateLoveNote', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Write a maximum 3 sentence love note for my valentine Isabella Aguila, from Miguel Castro."}],
      "temperature": 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${YOUR_CHATGPT_API_ENDPOINT}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract the generated love note from the response
    const loveNote = response.data.choices[0].message.content;
    console.log('Generated love note:', loveNote);

    // Send the generated love note to the client
    res.send({ loveNote });
  } catch (error) {
    console.error('Error generating love note:', error.response.data);
    res.status(500).send('Internal server error');
  }
});

// Handle GET request for random cat image
app.get('/catImage', async (req, res) => {
  try {
    const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${YOUR_GIPHY_API_KEY}&tag=angry+cat`;
    const response = await axios.get(giphyUrl);

    // Extract the embed URL from the response data
    const embedUrl = response.data.data.embed_url;

    // Send the embed URL to the client
    res.send({ embedUrl });
  } catch (error) {
    console.error('Error fetching cat image:', error.response.data);
    res.status(500).send('Internal server error');
  }
});

// Handle GET request for random cat image when "Yes" button is clicked
app.get('/loveCatImage', async (req, res) => {
  try {
    const giphyUrl = `https://api.giphy.com/v1/gifs/random?api_key=${YOUR_GIPHY_API_KEY}&tag=cat+in+love`;
    const response = await axios.get(giphyUrl);

    // Extract the embed URL from the response data
    const embedUrl = response.data.data.embed_url;

    // Send the embed URL to the client
    res.send({ embedUrl });
  } catch (error) {
    console.error('Error fetching love cat image:', error.response.data);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
