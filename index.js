const Discord = require('discord.js')
const client = new Discord.Client({
intents: 3276543,
partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
allowedMentions: { parse: ['everyone', 'roles', 'users'], repliedUser: false }
});

// [ (#) 𝐏𝐚𝐜𝐤𝐚𝐠𝐞𝐬 ]
const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { readdirSync, statSync , fs} = require('fs');
const chalk = require('chalk')
const { Database, JSONDriver } = require("st.db");
const { CommandCooldown , msToMinutes} = require('discord-command-cooldown');
const moment = require('moment');
const ms = require('ms');
const paypal = require('paypal-rest-sdk');
const schedule = require('node-schedule');
const mongoose = require("mongoose")
const { Probot } = require("discord-probot-transfer");
require("dotenv").config();

// [ (#) 𝐅𝐢𝐜𝐚𝐭𝐢𝐨𝐧𝐬 ]
const settings = require('./config/settings.js');
const rooms = require('./config/rooms.js');
const emoji = require('./config/emojis.json')

client.probot = Probot(client, {
fetchGuilds: true,
  data: [
    {
      fetchMembers: true,
      guildId: settings.SourceServer,
      probotId: settings.ProBotID,
      owners: settings.BankID,
    },
  ],
});

// [ (#)  𝐃𝐚𝐭𝐚𝐁𝐚𝐬𝐞 𝐅𝐢𝐜𝐚𝐭𝐢𝐨𝐧 ]
const options = {
  driver: new JSONDriver('./database/database.json')
};
const options2 = {
  driver: new JSONDriver('./database/dbDefamation.json')
};
const options3 = {
  driver: new JSONDriver('./database/Tickets.json')
};
const options4 = {
  driver: new JSONDriver('./database/TicketCount.json')
};
const options5 = {
  driver: new JSONDriver('./database/dbPoints.json')
};
const options6 = {
  driver: new JSONDriver('./database/ClosedTicket.json')
};
const options7 = {
  driver: new JSONDriver('./database/apply.json')
};
const options8 = {
  driver: new JSONDriver('./database/blacklist.json')
};
const options9 = {
  driver: new JSONDriver('./database/dbReceipts.json')
};
const options10 = {
  driver: new JSONDriver('./database/dbNumbers.json')
};

const db = new Database(options)
const dbDefamation = new Database(options2)
const dbTickets = new Database(options3)
const dbTicketCount = new Database(options4)
const dbPoints = new Database(options5)
const dbCloseTicket = new Database(options6)
const dbApply = new Database(options7)
const dbBlacklist = new Database(options8)
const dbReceipts = new Database(options9)
const dbNumbers = new Database(options10)

// [ (#) 𝐂𝐨𝐧𝐟𝐢𝐠 𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬 𝐏𝐫𝐨𝐣𝐞𝐜𝐭 ]
const prefix = settings.prefix
module.exports = { client, settings, prefix, rooms, emoji, db, dbDefamation, dbCloseTicket, dbTickets, dbTicketCount, dbApply, dbBlacklist, dbPoints, dbReceipts, dbNumbers };
require('./SlashCommands/SlashCommand.js');
require('./function/function/ready.js')(client, chalk); 
const initializeCommands = require('./function/commands.js');initializeCommands();
// const initializesetInterval = require('./function/setInterval.js');initializesetInterval();

// [ (#) 𝐌𝐨𝐧𝐠𝐨𝐃𝐚𝐭𝐚𝐁𝐚𝐬𝐞 𝐅𝐢𝐜𝐚𝐭𝐢𝐨𝐧 ]
const mongoEventFiles = readdirSync("./database/mongodb/mongoEvents").filter(file => file.endsWith(".js"))
client.dblogin = async () => {
for (file of mongoEventFiles) {
const event = require(`./database/mongodb/mongoEvents/${file}`);
if(event.once) { 
mongoose.connection.once(event.name, (...args) => event.execute(...args));
} else {
mongoose.connection.on(event.name, (...args) => event.execute(...args));
 }
}
mongoose.Promise = global.Promise
await mongoose.connect(process.env.mongodb, {
useUnifiedTopology: false,
useNewUrlParser: true,
})
};

const logAndReturn = (value) => console.log(value);
process.on("unhandledRejection", logAndReturn);
process.on("uncaughtException", logAndReturn);
process.on('uncaughtExceptionMonitor', logAndReturn);
process.on('multipleResolves', logAndReturn);
/*
client.on('guildMemberAdd', async (member) => {

const channelsToDo = await db.get(`ChannelsGreet`)

channelsToDo.forEach(async channelId => {
const channel = member.guild.channels.cache.get(channelId);
if (channel) {

try {
const mentionMessage = await channel.send({ content: `شيك هنا !! ${member}` });

setTimeout(async () => {
await mentionMessage.delete();
}, 5000);
} catch (error) {
console.error('Error mentioning member:', error);
}

}

})
})*/

// [ (#) Boost Message Thanks ]
/*
client.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (oldMember.premiumSince === null && newMember.premiumSince !== null) {
        const targetGuildId = "282255901283319818"; 
        const boostChannelId = "1213228651974369390"; 
        
        if (newMember.guild.id === targetGuildId) {
            const boostChannel = client.channels.cache.get(boostChannelId);
            
            if (boostChannel) {
                setTimeout(() => {
                boostChannel.send({
                    content: `**شكراً لك على البوست ${newMember} <a:RedEmo_23:1216295685947785256>**`
                });
            }, 30000);
            }
        }
    }
});*/

// [ (#) 𝐂𝐥𝐢𝐧𝐞𝐭 𝐋𝐨𝐠𝐠𝐢𝐧𝐠 ]
client.dblogin(process.env.mongodb)
client.login(process.env.token)

/*
client.on('messageCreate', async message => {
    try {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') {
            const channel = client.channels.cache.get('1256549322565357568');

            const content = message.content;
            let image = null;

            if (message.attachments.size > 0) {
                const attachment = message.attachments.first();
                image = attachment.url;
            }

            await channel.send({ 
                content: `${message.author.tag};\n${content}`, 
                files: image ? [image] : [] 
            });
        }
    } catch (error) {
        console.error('حدث خطأ:', error);
    }
});*/


let lastChannelToDelete = null; // تخزين القناة التي سيتم حذفها
let lastChanknelToDelete = null; // تخزين القناة التي سيتم حذفها
let lastChannelToDehlete = null; // تخزين القناة التي سيتم حذفها

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content === ".2") {
        if (lastChannelToDelete) {
            try {
                await lastChannelToDelete.delete();
                console.log(`تم حذف القناة السابقة: ${lastChannelToDelete.name}`);
            } catch (err) {
                console.error("تعذر حذف القناة السابقة:", err);
            }
        }

        lastChannelToDelete = message.channel; // تحديث القناة الأخيرة

        message.channel.send("🕐 سيتم حذف هذه القناة بعد 5 ثوانٍ...").then(() => {
            setTimeout(async () => {
                try {
                    await message.channel.delete();
                    console.log(`تم حذف القناة: ${message.channel.name}`);
                } catch (err) {
                    console.error("تعذر حذف القناة:", err);
                }
            }, 5000);
        });
    }
});