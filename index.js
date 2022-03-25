const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('JayBot start'));
bot.help((ctx) => ctx.reply('Ask J'));
bot.command('demo', (ctx) => {
	ctx.replyWithPhoto({ url: "https://i.ytimg.com/vi/528Iafd1QlU/hg" }, { caption: "cat photo" })
	//ctx.replyWithPhoto({ source: Buffer.alloc(10) }, { caption: "cat photo" })	
});

bot.command('meme', (ctx) => {

	//console.log(ctx.message);
	
	if(!ctx.update.message.reply_to_message) return;

	if(!ctx.update.message.reply_to_message.photo) return;

	let photos = ctx.update.message.reply_to_message.photo;

	let biggestIndex = photos.length - 1;
	/*let biggestIndex = -1;
	let biggestHeight = -1;
	
	for(let i=0; i<photos.length; ++i){
		if(photos[i].height >= biggestHeight) {
			biggestIndex = i;
			biggestHeight = photos[i].height;
		}
	}*/
	
	ctx.telegram.getFileLink( photos[biggestIndex].file_id ).then(
		(link)=>{
			console.log(link);
		}
	);	

	ctx.update.message.text.split('#');
	
	//ctx.replyWithPhoto({ source: Buffer.alloc(10) }, { caption: "cat photo" })	
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))