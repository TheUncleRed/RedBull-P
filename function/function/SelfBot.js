const discord1 = require('discord.js-selfbot-v13')
const Self = new discord1.Client({
    allowedMentions: {parse: ['roles'],repliedUser: false},
    ws: {properties: {
            $browser: 'Discord iOS'}
    },
    messageCacheMaxSize: 999999,
    intents: 3276543,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    allowedMentions: {
        parse: ['everyone', 'roles', 'users'],
        repliedUser: true
    }
});
Self.login(process.env.T)
Self.on(`ready`, () => {
console.log(Self.user.tag)
console.log(Self.guilds.cache.size)
})