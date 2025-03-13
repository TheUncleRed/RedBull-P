const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { client, db, emoji } = require("../../../index.js");

client.on("interactionCreate", async (interaction) => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId.startsWith('DefamationHelper-Details')) {
const value = interaction.values[0];
if (value == '3') {
await interaction.deferReply({ ephemeral: true })

const CaseID = interaction.customId.split('-')[2];

let dataCases = await db.get("TempCases") || [];
let dataCase = dataCases.find((t) => t.id === CaseID);
if (!dataCase) return interaction.editReply({ content: "❌ لم يتم العثور على القضية .", ephemeral: true });

const evidenceMap = {};
const evidenceOptions = (dataCase.screenshots && typeof dataCase.screenshots === "string") ? dataCase.screenshots.split("\n").map((url, index) => {
  const key = `ev_${CaseID}_${index}`;
evidenceMap[key] = url;
  return { label: `دليل رقم : ${index + 1}`, value: key };
}) : [];

if (evidenceOptions.length === 0) {
  return interaction.editReply({ content: "🚫 لا توجد دلائل لحذفها.", ephemeral: true });
}

await db.set(`evidenceMap_${CaseID}`, evidenceMap);

const row = new MessageActionRow().addComponents(
new MessageSelectMenu()
  .setCustomId(`remove_evidence-${CaseID}`)
  .addOptions(evidenceOptions)
);

await interaction.editReply({ content: "**قم يتحديد دليل لـ حذفة من البلاغ !**", components: [row] });

  }
}
});

//
client.on("interactionCreate", async (interaction) => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId.startsWith('remove_evidence')) {

const CaseID = interaction.customId.split("-")[1];
let dataCases = await db.get("TempCases") || [];
let dataCase = dataCases.find((t) => t.id === CaseID);

if (!dataCase) return interaction.update({ content: "❌ لم يتم العثور على القضية .", ephemeral: true });

await interaction.update({ content: `${emoji.Loading} - **يرجى منك الانتظار ، جاري حذف الدليل**` })

const evidenceMap = await db.get(`evidenceMap_${CaseID}`) || {};
const selectedKey = interaction.values[0];
const selectedUrl = evidenceMap[selectedKey];

if (!selectedUrl) {
  return interaction.update({ content: "❌ لم يتم العثور على الدليل.", ephemeral: true });
}

dataCase.screenshots = dataCase.screenshots.split("\n").filter((url) => url !== selectedUrl).join("\n");
await db.set("TempCases", dataCases);

delete evidenceMap[selectedKey];
await db.set(`evidenceMap_${CaseID}`, evidenceMap);

await interaction.editReply({ content: "**✅ تم حذف الدليل بنجاح !**", ephemeral: true });

}
});