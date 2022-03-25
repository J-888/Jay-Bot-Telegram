const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Code Capsules telegram bot.\nI echo messages. Please try it', {
    })
})

// copy every message and send to the user
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message))

// Start webhook via launch method (preferred)
bot.launch({
    webhook: {
      domain: 'https://nodejs-telegram-echobot-dzgubf.codecapsules.co.za',
      port: process.env.PORT
    }
  })
  
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))