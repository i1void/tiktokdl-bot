const sleep = require('../utils/sleep');

async function tiktok_photo(bot, msg, data) {
  const From = msg.chat.id;
  const { title, title_audio, video, audio } = data;

  const caption = `Title: ${title}`;

  try {
    const media = video.map((url, index) => ({
      type: 'photo',
      media: url,
      caption: index === 0 ? caption : undefined
    }));
    await bot.sendMediaGroup(From, media);
    await sleep(3000);

    await bot.sendAudio(From, audio[0], {
      caption: `Audio: ${title_audio}`,
      reply_markup: {
        inline_keyboard: [[{ text: 'URL Audio', url: audio[0] }]]
      }
    });
    await sleep(3000);

    await bot.sendMessage(From, 'Powered by @kxshibe1', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Support', url: 'https://t.me/@kxshibe1' }]]
      }
    });
  } catch (error) {
    await bot.sendMessage(From, 'Sorry, an error occurred while sending the TikTok photos.');
    console.error(`[ ERROR ] ${From}: ${error.message}`);
  }
}

module.exports = tiktok_photo;