const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, settings, dbPoints, dbTickets } = require('../../../index.js');

client.on("interactionCreate", async (interaction) => {
if (!interaction.isButton()) return;
if (interaction.customId === "ClaimTicket-Defamation") {

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const DataTicket = await dbTickets.get('Tickets-Defamation');
const E = DataTicket?.find((t) => t.Ticket === interaction.channel.id);
if (E?.userid == interaction.user.id) return interaction.reply({ content:`**يـ الله شو انك مجنون !\nلا يمكنك استلام التذكرة انت فاتحها !**`, ephemeral:true });

if (E && E.claim !== null) {
return interaction.deferReply({ ephemeral: true }).then(() => {
interaction.editReply({ content: `**تم استلام هذه التذكرة بالفعل من قبل الاداري <@${E.claim}>**`, ephemeral: true });
});
}

E.claim = interaction.user.id;
await dbTickets.set(`Tickets-Defamation`, DataTicket)

await interaction.message.components[0].components[1].setCustomId("UnClaimTicket-Defamation").setLabel(`UnClaim`);

const Datapoints = await dbPoints.get('Judges-Points');
const find = Datapoints?.find((j) => j.userid === interaction.user.id);

if (find) {
find.point += 1;
await dbPoints.set(`Judges-Points`, Datapoints);
} else {
await dbPoints.push(`Judges-Points`, {
userid: interaction.user.id,
point: 1,
})
}

let ClaimEmbed = new MessageEmbed()
.setDescription(`**تم استلام تذكرة ${interaction.channel} من قبل المُشهر ${interaction.user}**`)
.setColor(`${settings.HEX}`)

interaction.reply({ embeds: [ClaimEmbed] });

await interaction.message.edit({ components: [interaction.message.components[0]] });

const channel = await interaction.guild.channels.fetch(`${interaction.channel.id}`); 
await channel.edit({
permissionOverwrites : [
{
    id : interaction.user.id , 
    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
},{
    id : settings.Roles.Judge.JudgeRole , 
    deny : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
},{
    id : settings.Roles.Judge.DeputeJudgeOfficer , 
    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
},{
    id: settings.Roles.Judge.JudgeOfficer,
    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS", "MENTION_EVERYONE", "USE_APPLICATION_COMMANDS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
}
]
});

let currentName = interaction.channel.name;
let newName;

if (currentName.includes('-')) {
    let parts = currentName.split('-');
    parts[0] = interaction.user.username;
    newName = parts.join('-');
} else {
    newName = `claimed-${interaction.user.username}`;
}

await interaction.channel.setName(newName);

} else if (interaction.customId === "UnClaimTicket-Defamation") {

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const DataTicket = await dbTickets.get('Tickets-Defamation');
const E = DataTicket?.find((t) => t.Ticket === interaction.channel.id);

if (!E || E.claim !== interaction.user.id) {
return interaction.reply({ content: "**مستلم التذكرة فقط من يستطيع.**", ephemeral: true })
}

await interaction.message.components[0].components[1].setCustomId("ClaimTicket-Defamation").setLabel(`Claim`);

let UnCalaimEmbed = new MessageEmbed()
.setDescription(`تم الغاء استلام التذكرة بواسطة ${interaction.user}`)
.setColor(`${settings.HEX}`)

interaction.reply({ embeds: [UnCalaimEmbed] });

if (E && E.claim === interaction.user.id) {
E.claim = null;
await dbTickets.set(`Tickets-Defamation`, DataTicket);
}

await interaction.message.edit({ components: [interaction.message.components[0]] });

let currentName = interaction.channel.name;
let newName;

if (currentName.includes('-')) {
    let parts = currentName.split('-');
    parts[0] = 'unclaimd';
    newName = parts.join('-');
} else {
    newName = `unclaimed-${interaction.user.username}`;
}

await interaction.channel.setName(newName);

}
});