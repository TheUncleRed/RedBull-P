const { MessageActionRow, MessageButton, Modal, TextInputComponent } = require("discord.js");
const { client, db } = require('../../../index.js');

client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId.startsWith('DefamationHelper-SubmitReport')) {
const value = interaction.values[0];
if (value == 'DefamationHelper-EditPrice') {

const CaseID = interaction.customId.split('-')[2];
const dataCases = await db.get(`TempCases`) || [];
const dataCase = await dataCases?.find((t) => t.id == CaseID)

if(!dataCase) return interaction.reply({ content: '❌ | لم يتم العثور على القضية !', ephemeral: true });

const modal = new Modal()
.setCustomId(`ModalDefamationHelper-EditPrice-${CaseID}`)
.setTitle('・| Edit Case')
    
const price = new TextInputComponent()
.setCustomId('newPrice')
.setLabel('المبلغ؟ :')
.setValue(`${dataCase.creditstolen}`)
.setStyle('SHORT')
.setRequired(true);

const firstActionRow = new MessageActionRow().addComponents(price);

modal.addComponents(firstActionRow);
await interaction.showModal(modal);

  }
}
});

//
client.on('interactionCreate', async interaction => {
if (!interaction.isModalSubmit()) return;
if (interaction.customId.startsWith('ModalDefamationHelper-EditPrice')) {

const newPrice = interaction.fields.getTextInputValue('newPrice');

const CaseID = interaction.customId.split('-')[2];
const dataCases = await db.get(`TempCases`) || [];
const dataCase = await dataCases?.find((t) => t.id == CaseID)

if(!dataCase) return interaction.reply({ content: '❌ | لم يتم العثور على القضية !', ephemeral: true });

const row = new MessageActionRow().addComponents(
  new MessageButton()
.setCustomId(`DefamationHelper-ShowCase-${CaseID}`)
.setStyle('SUCCESS')
.setEmoji(`✅`))

dataCase.creditstolen = newPrice;
  await db.set("TempCases", dataCases);

await interaction.update({ embeds: [], components: [row] });
  
  }
});