const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client , settings } = require('../../index');
const emoji = require('../../config/emojis.json')

client.on('interactionCreate', async interaction => {
if (!interaction.isButton()) return
if (interaction.customId == 'CancelButton'){

await interaction.update({content : `**تم الغاء العملية بنجاح **`, embeds : [], components : []})

setTimeout(() => {
interaction.deleteReply()
}, 2000);
        
    }
})


client.on('interactionCreate', async interaction => {
if (!interaction.isButton()) return
if (interaction.customId == 'transbutton'){

const embed = interaction.message.embeds[0];
const description = embed.description

const regex = /```([^`]+)```/;
const match = description.match(regex);
        
if (match) {
const codeText = match[1].trim();
await interaction.deferUpdate(); 
await interaction.followUp({ content: `${codeText}`});

const updatedEmbed = new MessageEmbed(embed).setDescription(description);
await interaction.editReply({ embeds: [updatedEmbed], components: [] });

} else {
await interaction.reply('لم أتمكن من العثور على النص داخل العلامات الثلاثية.');
}

 }
})
