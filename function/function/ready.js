
module.exports = (client, chalk) => {
    client.on('ready', async () => {
    console.log(chalk.yellow(`${client.user.username} is ready`));
    client.user.setPresence({
        status: 'dnd', 
        activities: [{
            name: 'RedBull S | Discord.gg/reds',
            type: 'LISTENING' 
        }]
    });
    })
}