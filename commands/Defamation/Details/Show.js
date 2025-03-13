const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { client, db, emoji } = require("../../../index.js");

client.on("interactionCreate", async (interaction) => {
if (!interaction.isSelectMenu()) return;
if (interaction.customId.startsWith('DefamationHelper-Details')) {
const value = interaction.values[0];
if (value == '1') {
await interaction.deferReply({ ephemeral: true })

try {
 const CaseID = interaction.customId.split('-')[2];

let dataCases = await db.get("TempCases") || [];
let dataCase = dataCases.find((t) => t.id === CaseID);

if (!dataCase) {
  return interaction.editReply({ content: "❌ لم يتم العثور على القضية.", ephemeral: true });
}

await interaction.editReply({ 
  content: `${emoji.Loading} - **يرجى منك الانتظار ، جاري جلب الدلائل**`
});

if (!dataCase.screenshots || typeof dataCase.screenshots !== "string") {
  return interaction.editReply({ content: "❌ لا توجد دلائل لهذه القضية.", ephemeral: true });
}

const screenshots = dataCase.screenshots;
const attachments = screenshots.split("\n");

interaction.editReply({ 
  content: attachments.length > 0 ? "📜 **الدلائل:**" : "❌ لا توجد دلائل متاحة.", 
  files: attachments
});

} catch (error) {
console.error(`Error Case ${interaction.user.id} :`, error);
interaction.editReply({ content: "حدث خطا غير متوقع ، تم الابلاغ عن الخطا ، يرجى منك عدم التكرار !", ephemeral: true });
}

 }
}
});