const express = require('express'); 
const bodyParser = require('body-parser');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');
import { axios } from "module";

const app = express();
app.use(bodyParser.json()); // parses JSON bodies

// 🔐 Path to your service account file
const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');

// 🔧 Your Firebase project ID
const PROJECT_ID = 'testnotifly';

const auth = new GoogleAuth({
  keyFile: serviceAccountPath,
  scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
});

app.post('/send-notification', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { fcmToken, title, body, data } = req.body;

    if (!fcmToken) {
      return res.status(400).json({ error: 'Missing fcmToken in body' });
    }

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`;

    const messagePayload = {
      message: {
        token: fcmToken,
        notification: {
          title: title || 'Hello from FCM!',
          body: body || 'This notification came from your backend.',
        },
        data: data || {}
      }
    };

    const response = await axios.post(fcmUrl, messagePayload, {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    console.error('Error sending push notification:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
