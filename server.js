const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const {TOKEN, PREFIX} = require('./config');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //Commands when bot first logs in
    console.log("Servers Connected to: ");
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name);

        //guild.channels.forEach((channel) => {
            //console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        //})
    })
});

client.on('message', async msg => {
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;
    const args = msg.content.split(' ');
    let connection;

    if (msg.content.startsWith(`${PREFIX}help`)) {
       return msg.channel.send(`\nList of commands: \n!memes - Grabs a random zesty meme from the internet \n!song (Youtube link) - to play a song from Youtube in a voice channel`);

    }

    if (msg.content.startsWith(`${PREFIX}memes`)) {
        return msg.channel.send(`You\'re a meme. hah. lmao. got em.`);

    }

    if (msg.content.startsWith(`${PREFIX}play`)) {
        if (!args[1]){
            return msg.channel.send("Please specify a Youtube Link");
        }
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('You need to be in a voice channel');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has('CONNECT')) {
            return msg.channel.send('I don\'t have permission to connect.');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I don\'t have permission to speak in the voice channel.');
        }

        try {

            connection = await voiceChannel.join();
        } catch (error) {
            console.error(error);
            return msg.channel.send('Error: Couldn\'t join channel.');

        }
        const dispatcher = connection.playStream(ytdl(args[1]))
            .on('end', () => {
                console.log('Song Ended!');
                voiceChannel.leave();
            }).on('error', error => {
                console.log(error);
            });

        dispatcher.setVolumeLogarithmic(5 / 5);
    }



});

client.login(TOKEN);


//if (msg.content === '!help') {
    //msg.reply(`\nList of commands: \n!memes - Grabs a random zesty meme from the internet \n!song (Youtube link) - to play a song from Youtube in a voice channel`);
//}