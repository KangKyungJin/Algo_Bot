const Discord = require('discord.js');
const auth = require('./auth.json');
const {
	prefix,
	token,
} = require('./auth.json');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const ffmpeg = require('ffmpeg')


// mongoose.connect("mongodb://localhost/Algo_Bot_algosAPI");

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token)

var algoProblem;
const queue = new Map();

bot.on('ready', () => {
    console.log("Connected");
    fetch("http://localhost:8000/api/algos")
        .then(res => res.json())
            .then(data => {
                algoProblem = data.results;
                console.log(algoProblem[0]);
            })
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(`${prefix}play`)) {
        execute(message, serverQueue);
        return;
       } else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        return;
       } else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
        return;
       } else {
       message.channel.send('You need to enter a valid command! Dunder')
       }
       
    if (message.content === '!ping') {
        message.channel.send("pong");
    }
    if (message.content === '!algo') {
        message.channel.send("Difficulty: " + algoProblem[0].difficulty +  "\n Algorithm: " + algoProblem[0].algorithm)
    }
});


async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.bot.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

bot.login(token)

// fetch("https://leetcode.com/api/problems/algorithms/")
//         .then(res => res.json())
//             .then(data => {
//                 algoProblem = data.stat_status_pairs[0].stat;
//                 console.log(algoProblem);
//             })
//         .catch(err => console.log("Error in grabbing data"))
