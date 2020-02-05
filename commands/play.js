const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, algoProblem, servers, argo) => {
    //plays the first song in the queue. if queue doesnt exist creats one if it does it adds to the back.
    function play(connection,message){
        var server =servers[message.guild.id];

        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter:"audioonly"}));

        server.queue.shift();

        server.dispatcher.on("end" , function(){
            if(server.queue[0]){
                play(connection,message)
        
            }
            else{
                connection.disconnect();
            }
        })
    }

    if(!argo[1]){
        message.channel.send("you need to provide a link")
        return;
    }
    if(!message.member.voiceChannel){
        message.channel.send("you need to be in a voice channel")
        return;
    }
    if(!servers[message.guild.id])servers[message.guild.id] ={
        queue:[]
    }

    var server =servers[message.guild.id];

    server.queue.push(argo[1])
    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
        play(connection,message);
    })
};

module.exports.help = {
    name: "play"
};