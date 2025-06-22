const axios = require('axios');
const tiktok_video = require('./plugins/tiktok_video');
const tiktok_photo = require('./plugins/tiktok_photo');

async function handler(bot, msg) {
  const From = msg.chat.id;
  const body = /^https:\/\/.*tiktok\.com\/.+/;

  if (body.test(msg.text)) {
    const url = msg.text;
    try {
      // Menggunakan REST API
      const response = await axios.get(`https://api.iherta.my.id/downloader/tiktok?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (!data.status) {
        throw new Error('API returned false status');
      }

      const result = data.result;
      
      // Cek apakah ini foto/image atau video
      const isPhoto = result.type === 'image';

      if (isPhoto) {
        await tiktok_photo(bot, msg, result);
      } else {
        await tiktok_video(bot, msg, result);
      }
    } catch (error) {
      await bot.sendMessage(From, 'Sorry, an error occurred while downloading the TikTok content.');
      console.error(`[ ERROR ] ${From}: ${error.message}`);
    }
  }
}

module.exports = handler;