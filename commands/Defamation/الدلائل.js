const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { client, db, emoji } = require("./../../index.js");
const CHANNEL_ID = "1348471659774083112";

client.on("messageCreate", async (message) => {
if (message.author.bot) return;
if (message.channel.id !== CHANNEL_ID) return;

const args = message.content.split("\n");
const CaseID = args.shift().trim();

let dataCases = await db.get("TempCases") || [];
let dataCase = dataCases.find((t) => t.id == CaseID);

if (dataCase.block == 'true') {
  return message.reply({ content: "🚫 | انت محظور من استلام البلاغات و التحكم في البلاغات !" });
}

if (message.author.id !== dataCase.by) {
  return message.reply({ content: "🚫 | لا يمكنك التدخل في شؤون البلاغ !" });
}
  
if (!dataCase) {
  return message.reply("❌ لم يتم العثور على القضية بهذا المعرف.");
}

if (args.length === 0 && message.attachments.size === 0) {

  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId(`DefamationHelper-Details-${CaseID}`)
    .addOptions([
    {
    label: 'اظهار الدلائل',
    value: '1'
    },{
      label: 'رفع دلائل',
      value: '2'  
    },{
      label: 'حذف دليل',
      value: '3'  
    }
    ])
    )

    return message.reply({ content: "🔍 اختر أحد الخيارات:", components: [row] });
}

let images = dataCase.screenshots || "";
  
message.attachments.forEach((attachment) => {
if (attachment.contentType && attachment.contentType.startsWith("image/")) {
      images += (images ? "\n" : "") + attachment.url;
  }
});

args.forEach((line) => {
  const matches = line.match(/\bhttps?:\/\/\S+/gi) || [];
if (matches) {
        images += (images ? "\n" : "") + matches.join("\n");
  }
});
  
if (images) {
dataCase.screenshots = images;
  await db.set("TempCases", dataCases);
message.reply("✅ تم حفظ الصور بنجاح!");

} else {
      message.reply("❌ لم يتم العثور على أي صور.");
  }
});