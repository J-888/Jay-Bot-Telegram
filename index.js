const { Telegraf } = require('telegraf')
const TextToSVG = require('text-to-svg');
const axios = require('axios').default;
const sharp = require('sharp');

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('JayBot start'));

bot.help((ctx) => ctx.reply('Ask J'));

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



			const textToSVG = TextToSVG.loadSync();
		 
			const attributes = {fill: 'whire', stroke: 'black'};
			const options = {x: 0, y: 0, fontSize: 90, anchor: 'top', attributes: attributes};
			 
			const topText = textToSVG.getSVG('TOP TEXT', options);
			const bottomText = textToSVG.getSVG('BOTTOM TEXT', options);

			let url = "http:URL"; // Example

			axios.get(url,  { responseType: 'arraybuffer' }).then(function (response) {
				const buffer = Buffer.from(response.data, "utf-8");

				sharp(buffer)
				.composite([{
					input: Buffer.from(topText),
					gravity: 'north'
				}, {
					input: Buffer.from(bottomText),
					gravity: 'south'
				}])
				.toBuffer()
				.then(function (buffer) {
					ctx.replyWithPhoto({ source: buffer }, { caption: "cat photo" });
				});
			})
		}
	);
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))