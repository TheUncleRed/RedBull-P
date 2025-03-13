const {MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { client, dbTickets, dbTicketCount, emoji, settings } = require('./../../index.js');

client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return
if (interaction.customId == 'Create-Ticket'){
const value = interaction.values[0];

if (value == 'TypeCreate-Defamation'){

const DataCount = await dbTicketCount.get(`Defamation`)
const DataTicket = await dbTickets.get(`Tickets-Defamation`)
const ExitTicket = await DataTicket?.find((t) => t.userid == interaction.user.id)
if (ExitTicket) return await interaction.update({content : `**لديك تذكرة بالفعل يجب إغلاقها أولا <#${ExitTicket.Ticket}> !**`, embeds: [], components: [] })


await interaction.update({content : `${emoji.Loading} - جاري انشاء التذكرة ..`, embeds: [], components: [] })

const Ticket = await interaction.guild.channels.create(`ticket-${DataCount.count || 1}`, {
type : 'GUILD_TEXT', 
parent : settings.Parents.WaitingDefamation,
permissionOverwrites : [
{
    id : interaction.guild.roles.everyone.id , 
    deny : 'VIEW_CHANNEL', 
},{
    id : interaction.user.id , 
    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
},{
    id : settings.Roles.Judge.DeputeJudgeOfficer , 
    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
},{
    id: settings.Roles.Judge.JudgeOfficer,
    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS", "MENTION_EVERYONE", "USE_APPLICATION_COMMANDS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
}
]
});

if (DataCount){
    DataCount.count ++
await dbTicketCount.set(`Defamation`, DataCount)
} else {
await dbTicketCount.set(`Defamation`, {
    count : 1
})
}

const Emmed = new MessageEmbed()
.setDescription(`**- مرحبا عزيزي العضو ، انت هنا في تذكرة طلب مشهر لاخذ حقك
-  يرجى منك الضغط على زر (تقديم بلاغ) وقم بتعبئة البيانات المطلوبة منك لكي يتم استلام بلاغك من طاقم المشهرين باسرع وقت ممكن
- يجب عليك تعبئة النموذج بشكل كامل وايضا ارسال الدلائل المطلوبه منك فقط لا غير !**
- **From** : <@&1343325672743112820>\n-# **Protection Team**`)
.setImage('https://media.discordapp.net/attachments/1207553954515255327/1207598850710183936/18.png?ex=65e03b12&is=65cdc612&hm=6e8f4bf5c803316aa65173a5e118f19496dfcf35e0e5f57bd597e1d57d9e6be0&=&format=webp&quality=lossless&width=1919&height=599')
.setColor(`${settings.HEX}`)
.setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: false }) })
.setThumbnail( interaction.guild.iconURL({dynamic : true}))
.setTimestamp()

const row = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('CloseTicket-Defamation')
    .setLabel('Delete')
    .setStyle('DANGER'),

      new MessageButton()
    .setCustomId('ClaimTicket-Defamation')
    .setLabel('Claim')
    .setStyle('SECONDARY'), 

     new MessageButton()
     .setCustomId('ManageTicket-Defamation')
     .setLabel('Manage Ticket')
    .setStyle('SECONDARY'))

const row2 = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('Defamation-Report')
    .setLabel('تقديم بلاغ')
    .setStyle('SECONDARY'))

await dbTickets.push(`Tickets-Defamation`, {
userid : interaction.user.id ,
time : `<t:${Math.floor(Date.now() / 1000)}:F>` ,
claim : null ,
transcrept : null ,
Ticket : Ticket.id ,
type : 'open'
});
    
await Ticket.send({ content : `${interaction.user}`, embeds : [Emmed], components : [row] }).then((msg) => {
setTimeout(() => {
msg.pin()
}, 2500)
})

await Ticket.send({ content : `> ☄️ **لتقديم البلاغ لـ المُشهرين ولكي يتم الاستكمال معك من قِبل مُشهر ، يرجى منك الضغط على زر __تقديم بلاغ__**`, components : [row2] })
   
await interaction.editReply({content : `> **تم انشاء التذكرة بنجاح ${Ticket} | ✅**`})

        }
    }
});

































client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return
if (interaction.customId == 'Create-Ticket'){
const value = interaction.values[0];

if (value == 'TypeCreate-UnDefamation'){

const DataCount = await dbTicketCount.get(`Defamation`)
const DataTicket = await dbTickets.get(`Tickets-Defamation`)
const ExitTicket = await DataTicket?.find((t) => t.userid == interaction.user.id)
if (ExitTicket && ExitTicket.type == 'open') return await interaction.editReply({content : `**لديك تذكرة بالفعل يجب إغلاقها أولا <#${ExitTicket.Ticket}> !**`})


  await interaction.update({content : `${emoji.Loading} - جاري انشاء التذكرة ..`, embeds: [], components: [] })

const Ticket = await interaction.guild.channels.create(`ticket-${DataCount.count || 1}`, {
type : 'GUILD_TEXT', 
parent : settings.Parents.UnDefamation,
permissionOverwrites : [
{
    id : interaction.guild.roles.everyone.id , 
    deny : 'VIEW_CHANNEL', 
},{
    id : interaction.user.id , 
    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
},{
    id: settings.Roles.Judge.JudgeOfficer,
    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS", "MENTION_EVERYONE", "USE_APPLICATION_COMMANDS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
}
]
});

if (DataCount){
    DataCount.count ++
await dbTicketCount.set(`Defamation`, DataCount)
} else {
await dbTicketCount.set(`Defamation`, {
    count : 1
})
}

    // const Emmed = new MessageEmbed()
    // .setColor(settings.لون_الامبيد)
    // .setAuthor(interaction.guild.name , interaction.guild.iconURL({dynamic : true}))
    // .setFooter(interaction.guild.name , interaction.guild.iconURL({dynamic : true}))
    // .setThumbnail( interaction.guild.iconURL({dynamic : true}))
    // .setImage('https://media.discordapp.net/attachments/1207553954515255327/1207598850710183936/18.png?ex=65e03b12&is=65cdc612&hm=6e8f4bf5c803316aa65173a5e118f19496dfcf35e0e5f57bd597e1d57d9e6be0&=&format=webp&quality=lossless&width=1919&height=599')
    // .setDescription(`**- مرحبا عزيزي العضو , انت هنا في تذكرة طلب قاضي لأخذ حقك\n- يمكنك الضغط علي الزر بالاسفل (تقديم بلاغ) وقم بتعبئة البيانات المطلوبة منك لكي يتم استلام بلاغك\n- يجب عليك ملأ النموزج بشكل كامل وايضا ارسال الدلائل المطلوبه منك فقط لا غير !**`)

    // const Buttons = new MessageActionRow().addComponents(     
    //     new MessageButton()
    //     .setCustomId('Apply_Blag')
    //     .setLabel('تقديم بلاغ')
    //     .setStyle('SECONDARY'),

    //     new MessageButton()
    //     .setCustomId('N_Tashher')
    //     .setLabel('رفع بلاغ')
    //     .setStyle('SECONDARY'),

    //     new MessageButton()
    //     .setCustomId('ClaimTicket_Tashher')
    //     .setLabel('استلام التذكرة')
    //     .setStyle('SECONDARY'), 

    //     new MessageButton()
    //     .setCustomId('ManageJedTicket')
    //     .setLabel('مساعد القضاة')
    //     .setStyle('SECONDARY'), 
        
    //     new MessageButton()
    //     .setCustomId('CloseTicketJed')
    //     .setLabel('احذف التذكرة')
    //     .setStyle('DANGER'),
    // ); 


    // await dbTickets.push(`Tickets_Tashher`, {
    //     userid : interaction.user.id , 
    //     time : `<t:${Math.floor(Date.now() / 1000)}:R>`, 
    //     claim : null , 
    //     transcrept : null , 
    //     NameTicket : Ticket.name,
    //     Ticket : Ticket.id , 
    //     type : 'open'
    // })
    
    // await Ticket.send({content : `${interaction.user} || <@&${settings.Admins.Kdaa}>`, embeds : [Emmed], components : [Buttons]}).then((msg) => msg.pin()) 

   
await interaction.editReply({content : `> **تم انشاء التذكرة بنجاح ${Ticket} | ✅**`})

        }
    }
});


client.on('interactionCreate', async interaction => {
if (!interaction.isButton()) return;
if (interaction.customId == 'ManageTicket-Defamation'){

const hasAcss = (interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.roles.cache.some(role => role.id === `${settings.Roles.Judge.JudgeRole}` || role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) {
interaction.deferUpdate();
return;
}

const EmbedManage = new MessageEmbed()
.setDescription(`**- اهلا بك عزيزي المُشهر ${interaction.user} في ادارة التذكرة 
- يرجى منك تحديد ما المراد فعله في هذه التذكرة عن طريق القائمة بالاسفل ادناه !**`)
.setColor(`${settings.HEX}`)
  
const row = new MessageActionRow()
.addComponents( 
 new MessageSelectMenu()
.setCustomId('ManageTicket-Defamation1')
.setPlaceholder(`ادارة التذكرة`)
.addOptions({
label: `Rename Ticket`,
description: `لِـ تغير اسم التذكرة`,
value: '1',
},{
label: 'Add User',
description: `لِـ اضافة شخص للتذكرة`,
value: '2'
},{
label: 'Remove User',
description: `لِـ ازالة شخص من التذكرة`,
value: '3'
},{
label: 'Add Role To User',
description: `لِـ اضافة رتبة معينه لشخص معين`,
value: '4'
},{
label: 'Pin Ticket',
description: `لِـ نقل التذكرة الى قسم معين`,
value: '5'
}
)
)

await interaction.reply( {embeds: [EmbedManage], components : [row], ephemeral : true })

}
});