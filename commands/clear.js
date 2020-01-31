
module.exports.run = async (bot, message, args, algoProblem, servers, argo) => {
    if (!argo[1]) return message.reply('error plz add a second arg')
    message.channel.bulkDelete(argo[1]);
};

module.exports.help = {
    name: "clear"
};