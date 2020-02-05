const Discord = require('discord.js');

module.exports.run = async (bot, message, args, algoProblem, servers, argo) => { 
    // displays uer information in an embed format based on who sent the message.    
    const embed = new Discord.RichEmbed()
    .setTitle('User info')
    .setThumbnail(message.author.avatarURL)
    .addField('Player Name', message.author.username)
    .addField('Current Server', message.guild.name)
    .addField('level',)
    .setColor(0x7fff00);
    message.channel.send(embed);
    return;
};

module.exports.help = {
    name: "embed"
};