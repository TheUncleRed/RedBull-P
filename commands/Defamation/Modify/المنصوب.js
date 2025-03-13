const { MessageActionRow, MessageButton, Modal, TextInputComponent } = require("discord.js");
const { client, db } = require('../../../index.js');

client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId.startsWith('DefamationHelper-SubmitReport')) {
const value = interaction.values[0];
if (value == 'DefamationHelper-EditRepoterID') {

const CaseID = interaction.customId.split('-')[2];
const dataCases = await db.get(`TempCases`) || [];
const dataCase = await dataCases?.find((t) => t.id == CaseID)

if(!dataCase) return interaction.reply({ content: '❌ | لم يتم العثور على القضية !', ephemeral: true });

const modal = new Modal()
.setCustomId(`ModalDefamationHelper-EditRepoterID-${CaseID}`)
.setTitle('・| Edit Case')
    
const repoterID = new TextInputComponent()
.setCustomId('newRepoterID')
.setLabel('ايدي المنصوب؟ :')
.setStyle('SHORT')
.setRequired(true);

const firstActionRow = new MessageActionRow().addComponents(repoterID);

modal.addComponents(firstActionRow);
await interaction.showModal(modal);

  }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isModalSubmit()) return;
if (interaction.customId.startsWith('ModalDefamationHelper-EditRepoterID')) {

const newRepoterID = interaction.fields.getTextInputValue('newRepoterID');

const CaseID = interaction.customId.split('-')[2];
const dataCases = await db.get(`TempCases`) || [];
const dataCase = await dataCases?.find((t) => t.id == CaseID)

if(!dataCase) return interaction.reply({ content: '❌ | لم يتم العثور على القضية !', ephemeral: true });

const row = new MessageActionRow().addComponents(
  new MessageButton()
.setCustomId(`DefamationHelper-ShowCase-${CaseID}`)
.setStyle('SUCCESS')
.setEmoji(`✅`))

dataCase.repoter = newRepoterID;
  await db.set("TempCases", dataCases);

await interaction.update({ embeds: [], components: [row] });

  }
});