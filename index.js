const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Mengambil token dari Environment Variable di Render
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.post('/webhook', async (req, res) => {
  try {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const text = message.text;

      let reply = `Halo dari Render! Anda mengirim: "${text}"`;
      if (text.toLowerCase() === '/start') {
        reply = 'Selamat datang! Bot aktif di Render.';
      }

      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: reply
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error Webhook:', error.message);
    res.sendStatus(200);
  }
});

app.get('/', (req, res) => {
  res.send('Server Webhook Telegram Aktif di Render!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
