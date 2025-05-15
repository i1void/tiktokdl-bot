const TelegramBot = require('node-telegram-bot-api');
const chalk = require('chalk');
const { BOT_TOKEN } = require('./config');
const { version } = require('./package.json');
const handler = require('./handler');

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
let Start = new Date();

const userLanguage = {};

const displayBanner = () => {
  console.log(chalk.yellow.bold('TikTok Downloader Bot'));
};

const logs = (type, message, details = {}) => {
  const timestamp = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
  let color, prefix;

  switch (type.toLowerCase()) {
    case 'info':
      color = chalk.cyan;
      prefix = '[INFO]';
      break;
    case 'success':
      color = chalk.green;
      prefix = '[SUCCESS]';
      break;
    case 'error':
      color = chalk.red;
      prefix = '[ERROR]';
      break;
    case 'warning':
      color = chalk.yellow;
      prefix = '[WARNING]';
      break;
    default:
      color = chalk.white;
      prefix = '[LOG]';
  }

  const logMessage = `${prefix} [${timestamp}] ${message}`;
  const detailLines = Object.entries(details)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join('\n');

  console.log(color(logMessage));
  if (detailLines) console.log(color(detailLines));
};

displayBanner();
logs('info', 'Bot started', { Token: BOT_TOKEN.slice(0, 10) + '...' });

bot.on('polling_error', (error) => {
  logs('error', 'Polling error', { Error: error.message });
});

bot.setMyCommands([
  { command: '/start', description: 'Start the bot' },
  { command: '/help', description: 'View usage guide' },
  { command: '/runtime', description: 'Check bot uptime' },
]);

const getMessage = (lang, type) => {
  const messages = {
    id: {
      start: `
Selamat datang di *TikTok Downloader Bot* ‹𝟹
Saya akan membantu Anda mengunduh video, audio, atau foto TikTok tanpa watermark. Kirim **Hanya** tautan TikTok yang valid, seperti:
https://vt.tiktok.com/ZShxDd3sL/
Jangan tambahkan teks lain sebelum atau sesudah tautan.

〉*Cara Mendapatkan Tautan*:
1. Buka aplikasi TikTok.
2. Pilih video atau foto.
3. Ketuk *Bagikan* (panah ke kanan).
4. Pilih *Salin Tautan*.
5. Tempel **Hanya** tautan di sini.

Kirim **Hanya** tautan TikTok sekarang! Atau ketik /help untuk panduan lebih lanjut.
Pilih bahasa: *id*, *en*, atau *zh*`,
      help: `
〉*Panduan Penggunaan Bot* 
Saya di sini untuk membantu Anda mengunduh konten TikTok. Kirim **Hanya** tautan TikTok tanpa teks tambahan, seperti:
https://vt.tiktok.com/ZShxDd3sL/

〉*Fitur*:
- Unduh video TikTok tanpa watermark.
- Unduh audio atau foto/slideshow.
- Gunakan /runtime untuk cek waktu aktif bot.

〉*Cara Mengunduh*:
1. Buka TikTok, pilih video/foto.
2. Ketuk *Bagikan* > *Salin Tautan*.
3. Tempel **Hanya** tautan di sini.

〉*Penting*:
- Jangan tambahkan teks sebelum/sesudah tautan.
- Jika ada masalah, saya akan membantu!

Kirim **Hanya** tautan TikTok sekarang! Atau pilih bahasa: *id*, *en*, atau *zh*`,
      runtime: 'Bot aktif: {hours} jam, {minutes} menit, {seconds} detik.',
      invalid_url: `
Maaf, tautan yang Anda kirim bukan tautan TikTok yang valid. Pastikan tautan dari TikTok, seperti:
https://vt.tiktok.com/ZShxDd3sL/
Kirim **Hanya** tautan tanpa teks tambahan.

〉 *Cara Memperbaiki*:
1. Buka aplikasi TikTok.
2. Pilih video/foto, ketuk *Bagikan*.
3. Salin tautan.
4. Tempel **Hanya** tautan di sini.

Kirim **Hanya** tautan TikTok yang valid sekarang!`,
      strict_link_only: `
Maaf, Anda **Hanya** boleh mengirim tautan TikTok tanpa teks tambahan, seperti:
https://vt.tiktok.com/ZShxDd3sL/
Jangan tambahkan teks sebelum atau sesudah tautan.

〉 *Cara Memperbaiki*:
1. Buka aplikasi TikTok.
2. Pilih video/foto, ketuk *Bagikan*.
3. Salin tautan.
4. Tempel **Hanya** tautan di sini.

Kirim **Hanya** tautan TikTok sekarang!`,
      processing: 'Sedang memproses tautan TikTok Anda... Tunggu sebentar, ya!',
      processing_error: `
Maaf, ada masalah saat memproses tautan Anda. Mungkin tautan salah atau ada masalah jaringan.

〉 *Cara Memperbaiki*:
1. Pastikan tautan dari TikTok, seperti:
   https://vt.tiktok.com/ZShxDd3sL/
2. Salin ulang tautan.
3. Tempel **Hanya** tautan tanpa teks tambahan.

Kirim **Hanya** tautan TikTok sekarang!`,
      off_topic: `
Saya di sini untuk membantu mengunduh video, audio, atau foto TikTok. Kirim **Hanya** tautan TikTok yang valid atau gunakan perintah yang tersedia seperti /help.

〉 *Cara Mulai*:
1. Buka TikTok, pilih video/foto.
2. Ketuk *Bagikan* > *Salin Tautan*.
3. Tempel **Hanya** tautan di sini.

Kirim **Hanya** tautan TikTok sekarang!`,
    },
    en: {
      start: `
Welcome to *TikTok Downloader Bot* ‹𝟹
I’m here to help you download TikTok videos, audio, or photos without watermarks. Send **ONLY** a valid TikTok link, like:
https://vt.tiktok.com/ZShxDd3sL/
Do not include any text before or after the link.

〉 *How to Get the Link*:
1. Open the TikTok app.
2. Choose a video or photo.
3. Tap *Share* (right arrow).
4. Select *Copy Link*.
5. Paste **ONLY** the link here.

Send **ONLY** a TikTok link now! Or type /help for more guidance.
Choose language: *id*, *en*, or *zh*`,
      help: `
〉*How to Use the Bot* 
I’m here to help you download TikTok content. Send **ONLY** a TikTok link without extra text, like:
https://vt.tiktok.com/ZShxDd3sL/

〉*Features*:
- Download TikTok videos without watermarks.
- Download audio or photo/slideshows.
- Use /runtime to check bot uptime.

〉*How to Download*:
1. Open TikTok, select a video/photo.
2. Tap *Share* > *Copy Link*.
3. Paste **ONLY** the link here.

〉*Important*:
- Do not add text before/after the link.
- If there’s an issue, I’ll help troubleshoot!

Send **ONLY** a TikTok link now! Or choose language: *id*, *en*, or *zh*`,
      runtime: 'Bot active: {hours} hours, {minutes} minutes, {seconds} seconds.',
      invalid_url: `
Sorry, the link you sent isn’t a valid TikTok link. Ensure it’s from TikTok, like:
https://vt.tiktok.com/ZShxDd3sL/
Send **ONLY** the link without extra text.

〉 *How to Fix*:
1. Open the TikTok app.
2. Choose a video/photo, tap *Share*.
3. Copy the link.
4. Paste **ONLY** the link here.

Send **ONLY** a valid TikTok link now!`,
      strict_link_only: `
Sorry, you must send **ONLY** the TikTok link without extra text, like:
https://vt.tiktok.com/ZShxDd3sL/
Do not add text before or after the link.

〉*How to Fix*:
1. Open the TikTok app.
2. Choose a video/photo, tap *Share*.
3. Copy the link.
4. Paste **ONLY** the link here.

Send **ONLY** the TikTok link now!`,
      processing: 'Processing your TikTok link... Please wait a moment!',
      processing_error: `
Sorry, there was an issue processing your link. It could be an invalid link or network issue.

〉*How to Fix*:
1. Ensure the link is from TikTok, like:
   https://vt.tiktok.com/ZShxDd3sL/
2. Copy the link again.
3. Paste **ONLY** the link without extra text.

Send **ONLY** a TikTok link now!`,
      off_topic: `
I’m here to assist with downloading TikTok videos, audio, or photos. Please send **ONLY** a valid TikTok link or use available commands like /help.

〉 *How to Start*:
1. Open TikTok, select a video/photo.
2. Tap *Share* > *Copy Link*.
3. Paste **ONLY** the link here.

Send **ONLY** a TikTok link now!`,
    },
    zh: {
      start: `
欢迎使用 *TikTok下载机器人* ‹𝟹
我将帮助您下载TikTok的无水印视频、音频或照片。请**仅**发送有效的TikTok链接，例如：
https://vt.tiktok.com/ZShxDd3sL/
不要在链接前后添加任何文本。

〉 *如何获取链接*：
1. 打开TikTok应用程序。
2. 选择视频或照片。
3. 点击*分享*按钮（右箭头）。
4. 选择*复制链接*。
5. 在这里**仅**粘贴链接。

现在**仅**发送TikTok链接！或输入 /help 获取更多指导。
选择语言：*id*、*en* 或 *zh*`,
      help: `
〉*如何使用机器人* 
我在这里帮助您下载TikTok内容。请**仅**发送TikTok链接，不带额外文本，例如：
https://vt.tiktok.com/ZShxDd3sL/

〉*功能*：
- 下载无水印TikTok视频。
- 下载音频或照片/幻灯片。
- 使用 /runtime 检查机器人运行时间。

〉*如何下载*：
1. 打开TikTok，选择视频/照片。
2. 点击*分享* > *复制链接*。
3. 在这里**仅**粘贴链接。

〉*重要提示*：
- 不要在链接前后添加文本。
- 如有问题，我会帮助解决！

现在**仅**发送TikTok链接！ освободите选择语言：*id*、*en* 或 *zh*`,
      runtime: '机器人已激活: {hours} 小时, {minutes} 分钟, {seconds} 秒。',
      invalid_url: `
抱歉，您发送的链接不是有效的TikTok链接。请确保链接来自TikTok，例如：
https://vt.tiktok.com/ZShxDd3sL/
**仅**发送链接，不带额外文本。

〉*如何修复*：
1. 打开TikTok应用程序。
2. 选择视频/照片，点击*分享*。
3. 复制链接。
4. 在这里**仅**粘贴链接。

现在**仅**发送有效的TikTok链接！`,
      strict_link_only: `
抱歉，您必须**仅**发送TikTok链接，不带额外文本，例如：
https://vt.tiktok.com/ZShxDd3sL/
不要在链接前后添加文本。

〉*如何修复*：
1. 打开TikTok应用程序。
2. 选择视频/照片，点击*分享*。
3. 复制链接。
4. 在这里**仅**粘贴链接。

现在**仅**发送TikTok链接！`,
      processing: '正在处理您的TikTok链接... 请稍等！',
      processing_error: `
抱歉，处理您的链接时出现问题。可能是链接无效或网络问题。

〉*如何修复*：
1. 确保链接来自TikTok，例如：
   https://vt.tiktok.com/ZShxDd3sL/
2. 再次复制链接。
3. **仅**粘贴链接，不带额外文本。

现在**仅**发送TikTok链接！`,
      off_topic: `
我在这里帮助下载TikTok视频、音频或照片。请**仅**发送有效的TikTok链接或使用 /help 等可用命令。

〉*如何开始*：
1. 打开TikTok，选择视频/照片。
2. 点击*分享* > *复制链接*。
3. 在这里**仅**粘贴链接。

现在**仅**发送TikTok链接！`,
    },
  };
  return messages[lang][type];
};

const getMainKeyboard = () => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: '🇮🇩 Indonesia', callback_data: 'lang_id' },
        { text: '🇬🇧 English', callback_data: 'lang_en' },
        { text: '🇨🇳 Chinese', callback_data: 'lang_zh' },
      ],
      [
        { text: '⏰ Runtime', callback_data: 'runtime' },
        { text: '📖 Guide', callback_data: 'help' },
      ]
    ],
  },
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;
  const lang = userLanguage[chatId] || 'id';

  try {
    let newText = null;
    let newMarkup = null;

    if (data.startsWith('lang_')) {
      const newLang = data.split('_')[1];
      if (newLang !== userLanguage[chatId]) {
        userLanguage[chatId] = newLang;
        newText = getMessage(newLang, 'start');
        newMarkup = getMainKeyboard();
        logs('info', 'Language changed', { ChatID: chatId, Language: newLang });
      }
    } else if (data === 'runtime') {
      const now = new Date();
      const uptimeMilliseconds = now - Start;
      const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
      const uptimeMinutes = Math.floor(uptimeSeconds / 60);
      const uptimeHours = Math.floor(uptimeMinutes / 60);

      newText = getMessage(lang, 'runtime')
        .replace('{hours}', uptimeHours)
        .replace('{minutes}', uptimeMinutes % 60)
        .replace('{seconds}', uptimeSeconds % 60);
      newMarkup = {};
      logs('info', 'Runtime checked via button', { ChatID: chatId, Uptime: newText });
    } else if (data === 'help') {
      newText = getMessage(lang, 'help');
      newMarkup = getMainKeyboard();
      logs('info', 'Help requested via button', { ChatID: chatId });
    }

    if (newText) {
      await bot.editMessageText(newText, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'Markdown',
        reply_markup: newMarkup.reply_markup,
      });
    } else if (data !== 'runtime') {
       await bot.editMessageReplyMarkup(
        { reply_markup: {} },
        { chat_id: chatId, message_id: messageId }
      ).catch(() => {});
    }

    bot.answerCallbackQuery(query.id);
  } catch (error) {
    if (error.message.includes('message is not modified')) {
      bot.answerCallbackQuery(query.id);
      logs('warning', 'Message not modified, ignored', { ChatID: chatId, Error: error.message });
      return;
    }

    logs('error', 'Callback query failed', { ChatID: chatId, Error: error.message });
    await bot.sendMessage(chatId, getMessage(lang, 'processing_error'), { parse_mode: 'Markdown' });
    bot.answerCallbackQuery(query.id);
  }
});

bot.onText(/^\/start$/, async (msg) => {
  const chatId = msg.chat.id;
  const lang = userLanguage[chatId] || 'id';

  try {
    await bot.sendMessage(chatId, getMessage(lang, 'start'), {
      parse_mode: 'Markdown',
      ...getMainKeyboard(),
    });
    logs('info', 'Start command executed', { ChatID: chatId, Language: lang });
  } catch (error) {
    logs('error', 'Start command failed', { ChatID: chatId, Error: error.message });
    await bot.sendMessage(chatId, getMessage(lang, 'processing_error'), { parse_mode: 'Markdown' });
  }
});

bot.onText(/^\/help$/, async (msg) => {
  const chatId = msg.chat.id;
  const lang = userLanguage[chatId] || 'id';

  try {
    await bot.sendMessage(chatId, getMessage(lang, 'help'), {
      parse_mode: 'Markdown',
      ...getMainKeyboard(),
    });
    logs('info', 'Help command executed', { ChatID: chatId, Language: lang });
  } catch (error) {
    logs('error', 'Help command failed', { ChatID: chatId, Error: error.message });
    await bot.sendMessage(chatId, getMessage(lang, 'processing_error'), { parse_mode: 'Markdown' });
  }
});

bot.onText(/^\/runtime$/, async (msg) => {
  const chatId = msg.chat.id;
  const lang = userLanguage[chatId] || 'id';

  try {
    const now = new Date();
    const uptimeMilliseconds = now - Start;
    const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);

    const runtimeMessage = getMessage(lang, 'runtime')
      .replace('{hours}', uptimeHours)
      .replace('{minutes}', uptimeMinutes % 60)
      .replace('{seconds}', uptimeSeconds % 60);

    await bot.sendMessage(chatId, runtimeMessage, { parse_mode: 'Markdown' });
    logs('info', 'Runtime command executed', {
      ChatID: chatId,
      Uptime: runtimeMessage,
    });
  } catch (error) {
    logs('error', 'Runtime command failed', { ChatID: chatId, Error: error.message });
    await bot.sendMessage(chatId, getMessage(lang, 'processing_error'), { parse_mode: 'Markdown' });
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '(no text)';
  const lang = userLanguage[chatId] || 'id';
  const isStrictTikTokUrl = text.match(/^https:\/\/.*tiktok\.com\/.+$/);

  if (msg.hasOwnProperty('callback_query')) {
    return;
  }
  
  if (text.startsWith('/') && !['/start', '/help', '/runtime'].includes(text.split(' ')[0])) {
     logs('info', 'Unknown command ignored', { ChatID: chatId, Command: text });
     await bot.sendMessage(chatId, getMessage(lang, 'off_topic'), { parse_mode: 'Markdown' });
     return;
  }

  logs('success', 'Message received', {
    ChatID: chatId,
    Text: text.length > 50 ? text.slice(0, 47) + '...' : text,
    Type: isStrictTikTokUrl && text === msg.text.trim() ? 'TikTok URL' : text.startsWith('/') ? 'Command' : 'Text',
  });

  try {
    if (!text.startsWith('/')) {
      if (isStrictTikTokUrl && text === msg.text.trim()) {
        if (!text.includes('vt.tiktok.com') && !text.includes('tiktok.com') && !text.includes('vm.tiktok.com')) {
          await bot.sendMessage(chatId, getMessage(lang, 'invalid_url'), { parse_mode: 'Markdown' });
          logs('warning', 'Invalid TikTok URL', { ChatID: chatId, URL: text });
          return;
        }

        await bot.sendMessage(chatId, getMessage(lang, 'processing'), { parse_mode: 'Markdown' });
        try {
          await handler(bot, msg);
          logs('success', 'TikTok URL processed', { ChatID: chatId, URL: text });
        } catch (handlerError) {
          logs('error', 'Handler failed', { ChatID: chatId, Error: handlerError.message });
          await bot.sendMessage(chatId, getMessage(lang, 'processing_error'), { parse_mode: 'Markdown' });
        }
      } else { 
        if (isStrictTikTokUrl) { 
            await bot.sendMessage(chatId, getMessage(lang, 'strict_link_only'), { parse_mode: 'Markdown' });
            logs('warning', 'Message contains extra text with TikTok URL', { ChatID: chatId, Text: text });
        } else { 
            await bot.sendMessage(chatId, getMessage(lang, 'off_topic'), { parse_mode: 'Markdown' });
            logs('info', 'Off-topic message received', { ChatID: chatId, Text: text.slice(0,50) });
        }
      }
    }
  } catch (error) {
    logs('error', 'Message processing failed', { ChatID: chatId, Error: error.message });
    await bot.sendMessage(chatId, getMessage(lang, 'processing_error'), { parse_mode: 'Markdown' });
  }
});