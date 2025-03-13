const { MessageActionRow, MessageSelectMenu, MessageEmbed, Modal, TextInputComponent } = require('discord.js');
const { client, rooms, settings } = require('../../../index.js');

client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId == 'ManageTicket-Defamation1'){
const value = interaction.values[0];
if (value == '1'){

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const modal = new Modal()
.setCustomId('ModalManageTicket-Rename-Defamation')
.setTitle('تغيير اسم التذكرة')
    
const Name = new TextInputComponent()
.setCustomId('TicketNewName')
.setLabel('اسم التذكرة الجديد ؟ :')
.setStyle('SHORT')
.setRequired(true);

const firstActionRow = new MessageActionRow().addComponents(Name);

modal.addComponents(firstActionRow);
await interaction.showModal(modal);

 }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId == 'ManageTicket-Defamation1'){
const value = interaction.values[0];
if (value == '2'){

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}
  
const modal = new Modal()
.setCustomId('ModalManageTicket-AddMember-Defamation')
.setTitle('اضافة شخص للتذكرة')

const MemberID = new TextInputComponent()
.setCustomId('memberid')
.setLabel('ايدي العضو ؟ :')
.setStyle('SHORT')
.setRequired(true);

const firstActionRow = new MessageActionRow().addComponents(MemberID);

modal.addComponents(firstActionRow);
await interaction.showModal(modal);

 }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId == 'ManageTicket-Defamation1'){
const value = interaction.values[0];
if (value == '3'){

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const modal = new Modal()
.setCustomId('ModalManageTicket-RemoveMember-Defamation')
.setTitle('ازالة شخص من التذكرة')

const MemberID = new TextInputComponent()
.setCustomId('memberid')
.setLabel('ايدي العضو ؟ :')
.setStyle('SHORT')
.setRequired(true);

const firstActionRow = new MessageActionRow().addComponents(MemberID);

modal.addComponents(firstActionRow);
await interaction.showModal(modal);

 }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId == 'ManageTicket-Defamation1'){
const value = interaction.values[0];
if (value == '4'){

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const modal = new Modal()
.setCustomId('ModalManageTicket-AddRole-Support')
.setTitle('اعطاء رتبة')
    
const AddRole = new TextInputComponent()
.setCustomId('memberid')
.setLabel('ايدي العضو ؟ :')
.setStyle('SHORT')
.setRequired(true);

const RoleAdd = new TextInputComponent()
.setCustomId('role')
.setLabel('اسم الرتبة :')
.setPlaceholder('صور | الدعم الصوتي')
.setStyle('SHORT')
.setRequired(true);

const firstActionRow = new MessageActionRow().addComponents(AddRole);
const secondActionRow = new MessageActionRow().addComponents(RoleAdd);

modal.addComponents(firstActionRow, secondActionRow);
await interaction.showModal(modal);

 }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId == 'ManageTicket-Defamation1'){
const value = interaction.values[0];
if (value == '5'){

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('ManageTicket-CategoryChange')
.setPlaceholder('الاقسام العامة')
.addOptions([ 
{
label: '・Support',
description: `لـِ نقل التذكرة الى كاتجوري الدعم الفني`,
value: 'الدعم الفني',
}, {
label: '・Report',
description: `لـِ نقل التذكرة الى كاتجوري البلاغات`,
value: 'بلاغات',
}, {
label: '・Ad',
description: `لـِ نقل التذكرة الى كاتجوري الاعلانات`,
value: 'اعلانات',
}
])
);

const row1 = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
.setCustomId('ManageTicket-CategoryChange2')
.setPlaceholder('الاقسام الادارية')
.addOptions([ 
{
label: '・Transfer',
description: `لـِ نقل التذكرة الى كاتجوري التسليمات`,
value: 'تسليمات',
}, {
label: '・Leader',
description: `لـِ نقل التذكرة الى كاتجوري الادارة العليا`,
value: 'عليا',
}, {
label: '・Owner',
description: `لـِ نقل التذكرة الى كاتجوري الاونرز !`,
value: 'اونرات',
},
]),
);

const embed = new MessageEmbed()
.setDescription(`**- اهلا بك عزيزي المُشهر: ${interaction.user} مره اخرى !\n- يرجى منك تحديد نوع القسم(\`الكاتجوري\`) الذي تود نقل التذكرة اليه\n- يرجى منك اختيار القسم الذي تود نقل التذكرة اليه بعنايه و عدم نقل التذكرة الا لاسباب يتعلق القسم المراد النقل عليه يختص في اسباب نقل هذه التذكرة**`)
.setColor(`${settings.HEX}`)
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setTimestamp()

await interaction.update({ embeds: [embed], components: [row, row1]});

 }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isModalSubmit()) return;
if (interaction.customId == 'ModalManageTicket-Rename-Defamation') {

const newName = interaction.fields.getTextInputValue('TicketNewName');
const channel = interaction.channel;
const oldName = channel.name; 

const SourceLog = client.guilds.cache.get(settings.SourceServer).channels.cache.get(rooms.ManageTicket.Rename);
const ExitLog = client.guilds.cache.get(settings.BackupServer).channels.cache.get(rooms.ManageTicket.LogRename);

await channel.setName(newName);

const embed = new MessageEmbed()
.setTitle(`تغيير اسم التذكرة`)
.setDescription(`**تم تغيير اسم التذكرة الى \`${newName}\` !**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setTimestamp();

await interaction.update({ embeds: [embed], components: [] });

let EmbedLog = new MessageEmbed()
.setTitle('- Rename Ticket')
.setDescription(`**- المُشهر : ${interaction.user}\n- ايدي المُشهر : ${interaction.user.id}\n- الاسم الجديد : ${newName}\n- الاسم القديم : ${oldName}\n- التذكرة : ${channel}\n- ايدي التذكرة : ${channel.id}\n- تاريخ تغيير الاسم : <t:${Math.floor(Date.now() / 1000)}:R>**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setThumbnail(interaction.guild.iconURL({ dynamic: false }))
.setTimestamp();

SourceLog.send({ embeds: [EmbedLog] });
SourceLog.send({ content: `${settings.lineurl}` });

ExitLog.send({ embeds: [EmbedLog] });
ExitLog.send({ content: `${settings.lineurl}` });

  }
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isModalSubmit()) return;
if (interaction.customId == 'ModalManageTicket-AddMember-Defamation'){
const userId = interaction.fields.getTextInputValue('memberid');

const member = await interaction.guild.members.fetch(userId).catch(() => null);

const channel = interaction.channel;
const SourceLog = client.guilds.cache.get(settings.SourceServer).channels.cache.get(rooms.ManageTicket.AddUser);
const ExitLog = client.guilds.cache.get(settings.BackupServer).channels.cache.get(rooms.ManageTicket.LogAddUser);

let EmbedNoMember = new MessageEmbed()
.setTitle(`اضافة عضو للتذكرة`)
.setDescription(`**هذا الشخص ليس متواجد في السيرفر للإضافة !**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

if(!member) {
interaction.update({ embeds: [EmbedNoMember] });
await channel.send({ content: `${interaction.user}`, embeds: [EmbedNoMember] });
return;
}

const channelPermission = channel.permissionOverwrites.resolve(member.id);
if (!channelPermission) {
await channel.permissionOverwrites.create(member, {
VIEW_CHANNEL: true,
 SEND_MESSAGES: true,
  ATTACH_FILES: true
});

let EmbedMember = new MessageEmbed()
.setTitle(`اضافة عضو للتذكرة`)
.setDescription(`**تم اضافة العضو ${member} للتذكرة**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

await interaction.update({ embeds: [EmbedMember], components: [] });
await channel.send({ content: `${interaction.user} || ${member}`, embeds: [EmbedMember] });

let embedLog = new MessageEmbed()
.setTitle('- Add User')
.setDescription(`**- الشخص : ${member}\n- ايدي الشخص : ${member.id}\n- المُشهر : ${interaction.user}\n- ايدي المُشهر : ${interaction.user.id}\n- التذكرة : ${channel}\n- ايدي التذكرة : ${channel.id}\n- تاريخ الإضافة : <t:${Math.floor(Date.now() / 1000)}:R>**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

SourceLog.send({ embeds : [embedLog] })
SourceLog.send({ content: `${settings.lineurl}` })

ExitLog.send({ embeds : [embedLog] })
ExitLog.send({ content: `${settings.lineurl}` })
}

if (channelPermission) {
let EmbedMember = new MessageEmbed()
.setTitle(`اضافة عضو للتذكرة`)
.setDescription(`**هذا العضو بالفعل متواجد في التذكرة !.**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

await interaction.update({ embeds: [EmbedMember], components: []});
return;

 }

}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isModalSubmit()) return;
if (interaction.customId == 'ModalManageTicket-RemoveMember-Defamation'){
const userId = interaction.fields.getTextInputValue('memberid');

const member = await interaction.guild.members.fetch(userId).catch(() => null);

const channel = interaction.channel;
const SourceLog = client.guilds.cache.get(settings.SourceServer).channels.cache.get(rooms.ManageTicket.RemoveUser);
const ExitLog = client.guilds.cache.get(settings.BackupServer).channels.cache.get(rooms.ManageTicket.LogRemoveUser);

let EmbedNoMember = new MessageEmbed()
.setTitle(`ازالة عضو من التذكرة`)
.setDescription(`**هذا الشخص ليس متواجد في السيرفر لازالة !**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

if(!member) {
interaction.update({ embeds: [EmbedNoMember] });
await channel.send({ content: `${interaction.user}`, embeds: [EmbedNoMember] });
return;
}

const channelPermission = channel.permissionOverwrites.resolve(member.id);
if (channelPermission) {
await channel.permissionOverwrites.delete(member)

let EmbedMember = new MessageEmbed()
.setTitle(`ازالة عضو من التذكرة`)
.setDescription(`**تم ازالة العضو ${member} من التذكرة**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

await interaction.update({ embeds: [EmbedMember], components: [] });
await channel.send({ content: `${interaction.user} || ${member}`, embeds: [EmbedMember] })

let embedLog = new MessageEmbed()
.setTitle('- Remove User')
.setDescription(`**- الشخص : ${member}\n- ايدي الشخص : ${member.id}\n- المُشهر : ${interaction.user}\n- ايدي المُشهر : ${interaction.user.id}\n- التذكرة : ${channel}\n- ايدي التذكرة : ${channel.id}\n- تاريخ الازالة : <t:${Math.floor(Date.now() / 1000)}:R>**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

SourceLog.send({ embeds : [embedLog] })
SourceLog.send({ content: `${settings.lineurl}` })

ExitLog.send({embeds : [embedLog]})
ExitLog.send({ content: `${settings.lineurl}` })
}

if (!channelPermission) {
let EmbedMember = new MessageEmbed()
.setTitle(`ازالة عضو من التذكرة`)
.setDescription(`**هذا العضو غير متواجد في التذكرة !.**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

await interaction.update({ embeds: [EmbedMember], components: [] });
return;
 
  }

}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId == 'ManageTicket-CategoryChange' || interaction.customId == 'ManageTicket-CategoryChange2') {
const value = interaction.values[0];
let categoryMap = {
  'عليا': settings.ManageTicket.CategoryHighTickets,
  'اونرات': settings.ManageTicket.CategoryHighTickets,
  'الدعم الفني': settings.ManageTicket.TicketsSupport,
  'بلاغات': settings.ManageTicket.CategoryReportTickets,
  'اعلانات': settings.ManageTicket.CategoryAdsTickets,
  'تسليمات': settings.ManageTicket.CategoryTransferTickets
};

if (!categoryMap[value]) return;

let channel = interaction.channel;
const ExitLog = client.guilds.cache.get(settings.BackupServer).channels.cache.get(rooms.ManageTicket.CategoryChange);

let oldCategory = channel.parent ? channel.parent.name : 'غير معروف';

if (channel.parentId == categoryMap[value]) {
let embed = new MessageEmbed()
.setTitle(`نقل التذكرة`)
.setDescription(`**هذه التذكرة بالفعل متواجدة في هذا القسم !**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setTimestamp();

await interaction.update({ embeds: [embed], components: [] });
return;
}

await channel.setParent(categoryMap[value]);

let DnEmbed = new MessageEmbed()
.setTitle(`نقل التذكرة`)
.setDescription(`**تم نقل التذكرة بنجاح الى كاتجوري (\`${value}\`) !**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setTimestamp();

await interaction.update({ embeds: [DnEmbed], components: [] });
await channel.send({ content: `${interaction.user}`, embeds: [DnEmbed] });

let EmbedLog = new MessageEmbed()
.setTitle('- Category Change')
.setDescription(`**- المُشهر : ${interaction.user}\n- ايدي المُشهر : ${interaction.user.id}\n- الكاتجوري الجديد : ${value}\n- الكاتجوري القديم : ${oldCategory}\n- التذكرة : ${channel}\n- ايدي التذكرة : ${channel.id}\n- تاريخ نقل التذكرة : <t:${Math.floor(Date.now() / 1000)}:R>**`)
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setTimestamp();

ExitLog.send({ embeds: [EmbedLog] });
ExitLog.send({ content: `${settings.lineurl}` });

  }
});