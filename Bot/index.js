const Discord = require('discord.js');
const fs = require('fs');

const Embeds = require('./modules/embeds')

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

var client = new Discord.Client();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

require('discord-buttons')(client);

const activitys = ['Use ?test', 'https://lokilp66.netlify.app'];
let current = 1;

const guildIDs = ['841758147277750333', '810826422490628145']

client.on('ready', async() => {
    const guildcommands1 = await creatGuildCommand({
            name: 'test',
            description: 'This is a Test command'
        },
        '841758147277750333')

    const guildcommands2 = await creatGuildCommand({
            name: 'test',
            description: 'This is a Test command'
        },
        '810826422490628145')

    console.log(guildcommands1)
    console.log(guildcommands2)

    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setStatus('online')

    client.user.setActivity(activitys[0], { type: 'PLAYING' })

    setInterval(() => {
        if (activitys[current]) {
            client.user.setActivity(activitys[current], { type: 'PLAYING' })
            current++;
        } else {
            current = 0;
            client.user.setActivity(activitys[current], { type: 'PLAYING' })
        }
    }, 5 * 1000)

});

async function creatGuildCommand(data, guildID) {
    return await client.api.applications(client.user.id).guilds(guildID).commands.post({
        data: data
    });
};

var cmdmap = {
    say: cmd_say,
    help: cmd_help,
    test: cmd_test,
}

client.on('clickButton', async(button) => {
    if (button.id === 'smart') {
        button.defer()
        button.channel.send(`${button.clicker.user.tag} is smart`)
    }
    if (button.id === 'dumbass') {
        button.defer()
        button.channel.send(`${button.clicker.user.tag} is a dumbass`)
    }
});

function cmd_say(msg, args) {
    msg.channel.send(args.join(' '));
}

function cmd_test(msg, args) {
    Embeds.error(msg.channel, '', 'Are you smart', client.user.tag);
}

function cmd_help(msg, args) {
    msg.channel.send('Dies ist eine Hilfe!');
}

client.on('message', (msg) => {

    var cont = msg.content,
        author = msg.member,
        chan = msg.channel,
        guild = msg.guild

    if (author.id != client.user.id && cont.startsWith(config.prefix)) {

        var invoke = cont.split(' ')[0].substr(config.prefix.length),
            args = cont.split(' ').slice(1);

        if (invoke in cmdmap) {
            cmdmap[invoke](msg, args);
        }

    }

});



client.login(config.token);