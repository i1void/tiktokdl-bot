const sleep = require('../utils/sleep');

async function tiktok_photo(bot, msg, data) {
  const From = msg.chat.id;
  const { title, media, music } = data;

  const caption = `Title: ${title}`;

  try {
    // Kirim foto sebagai media group
    const photos = media.images.map((url, index) => ({
      type: 'photo',
      media: url,
      caption: index === 0 ? caption : undefined
    }));
    
    await bot.sendMediaGroup(From, photos);
    await sleep(3000);

    // Kirim audio jika ada
    if (music && music.url) {
      await bot.sendAudio(From, music.url, {
        caption: `Audio: ${music.title} - ${music.author}`,
        reply_markup: {
          inline_keyboard: [[{ text: 'URL Audio', url: music.url }]]
        }
      });
      await sleep(3000);
    }

    await bot.sendMessage(From, 'Powered by @1void', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Support', url: 'https://i.ibb.co/39WWrhwC/f827d96e3e10.png' }]]
      }
    });
  } catch (error) {
    await bot.sendMessage(From, 'Sorry, an error occurred while sending the TikTok photos.');
    console.error(`[ ERROR ] ${From}: ${error.message}`);
  }
}

module.exports = tiktok_photo;