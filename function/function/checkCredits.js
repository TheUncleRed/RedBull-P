const { MessageCollector, MessageEmbed } = require('discord.js');

/**
 * @param {Interaction} interaction 
 * @param {number} price 
 * @param {number} time 
 * @param {string} bank 
 * @param {string} probot 
 * @returns {Promise<CollectedMessage|undefined>}
 */
async function checkCredits(interaction, price, time, bank, probot) {
    const filter = ({ content, author: { id } }) => {
        return (
            content.startsWith(`**:moneybag: | ${interaction.user.username}, has transferred `) &&
            content.includes(bank) &&
            id === probot &&
            (Number(content.match(/\$([\d,]+)`/)[1]) >= price)
        );
    };
    

    const collector = interaction.channel.createMessageCollector({
        filter,
        max: 1,
        time: time, 
    });

    return new Promise(async (resolve, reject) => {
        collector.on('collect', (collected) => resolve(collected));
        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
            reject();
            }
        });
    })
    .then((collected) => {
        collector.stop();
        return { success: true, collected };
    })
    .catch(() => {
        return { success: false };
    });
}

module.exports = checkCredits;
