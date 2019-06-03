const Discord = require('discord.js');
const client = new Discord.Client();
const _config = require('./config');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //Commands when bot first logs in
    console.log("Servers Connected to: ");
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
});

client.on('message', msg => {
    if (msg.content === '!help') {
        msg.reply(`\nList of commands: \n!memes - Grabs a random zesty meme from the internet \n!song (Youtube link) - to play a song from Youtube in a voice channel`);
    }
});

client.login(_config.server.token);
