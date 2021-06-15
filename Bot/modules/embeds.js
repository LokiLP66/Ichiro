const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

const COLORS = {
    red: 0xaf0606,
    green: 0x00c300,
    blue: 0x0084ff
};

module.exports = {

    error(chan, cont, title, author) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(COLORS.blue)
            .setFooter(author)
            .setDescription(cont)

        const yes = new MessageButton()
            .setStyle('green')
            .setLabel('Yes')
            .setID('smart')

        const no = new MessageButton()
            .setStyle('red')
            .setLabel('No')
            .setID('dumbass')

        chan.send('', {
            buttons: [yes, no],
            embed: embed
        })

    }

}