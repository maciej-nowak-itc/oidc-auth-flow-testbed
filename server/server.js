const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    console.log('todo, server\n', req.body);
    const endpoint = req.body.endpoint;
    if (endpoint == null) {
      throw Error('Where do you want to go?');
    }
    let response;
    if (req.body.method === 'GET') {
      if (params) {
          const urlParams = new URLSearchParams(req.body.requestParams);
          response = await axios.get(`${endpoint}?${urlParams.toString()}`);
      } else {
          response = await axios.get(`${endpoint}}`);
      }
    } else if (req.body.method === 'POST') {
      let postData;
      if (req.body.contentType === 'application/x-www-form-urlencoded') {
        const urlEncodedParams = new URLSearchParams(req.body.requestParams);
        postData = urlEncodedParams.toString();
      } else if (req.body.contentType === 'multipart/form-data') {
        postData = new FormData();
        Object.keys(req.body.requestParams).forEach((key) => {
            formData.append(key, params[key]);
        });
      } else {
        throw Error('Not sure what to do with this request.');
      }
      response = await axios.post(endpoint, postData, {
          headers: { 'Content-Type':  req.body.contentType},
      });
    } else {
      throw Error('Not sure what to do with this request.');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error in proxy request:', error);
    res.status(500).json({ error: 'Error while proxying the request to AAD' });
  }
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Serving React
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});



  app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
