const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { client, dbBlacklist, emoji, settings } = require('./../../index.js');

client.on('messageCreate', async message => {
if (!message.guild || message.author.bot) return;

if (message.content === settings.prefix + `setup-ticket`) {

if (message.guild.id !== settings.SourceServer) return;
const hasAcss = (message.member.permissions.has('ADMINISTRATOR') || message.member.roles.cache.some(role => role.id === `${settings.Roles.Admin.AllAccess_Staff}`) )
if(!hasAcss) return;

const Emmed = new MessageEmbed()
.setDescription(`**اذا عندك سؤال , عايز تشتري اعلان .. اختار الدعم الفني
اذا حد نصبك اختار طلب مشهر
اذا عندك شكوى على حد من طاقم الادارة اختار شكاوي على طاقم الادارة
        
ملاحظات :
        
تفتح شكوى و تكون على حد مش من طاقم الادارة = مخالفة
استهبال بالتكتات = مخالفة
تفتح تكت ملهاش علاقة بالي عايزه , مثال : تفتح شكوى و عايز تشتري رتبة = مخالفة
        
المخالفة تختلف حسب الغلطة الي سويتها**`)
.setImage('https://media.discordapp.net/attachments/1221887365182914570/1221887503607529593/20240325_211614.png?ex=6614366a&is=6601c16a&hm=362db5a40dec3fcd61468710b03203555ad3e4b8cb63bea4d69e9bed5497aeeb&=&format=webp&quality=lossless&width=1025&height=374')
.setColor(`${settings.HEX}`)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: false }) })
.setThumbnail(message.guild.iconURL({ dynamic: false }))
.setTimestamp()

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("OpenType-Tickets")
        .setLabel("Create Ticket")
        .setStyle("SECONDARY")
        .setEmoji(`📩`)
    );

    message.channel.send({ embeds: [Emmed], components: [row] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId == "OpenType-Tickets") {
    await interaction.deferReply({ ephemeral: true });

    const data = await dbBlacklist.get(`Ticket`);
    const ex = await data?.find((t) => t.userid == interaction.user.id);
    if (ex)
      return await interaction.editReply({
        content: `**${emoji.no}  | لديك بلاك لست ، لا يمكنك انشاء تذكرة**`,
      });

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("open_Ticket")
        .setPlaceholder("❗│ Select Type Ticket ..")
        .addOptions([
          {
            label: "الدعم الفني",
            value: "TypeTicket-Support",
          },
          {
            label: "طلب مُشهر",
            value: "TypeTicket-Defamation",
          },
          {
            label: "طلب وسيط",
            value: "TypeTicket-Meditor",
          },
          {
            label: "شكوى على طاقم الادارة",
            value: "TypeTicket-Report",
          },
        ])
    );

    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `> **${emoji.Dot} يرجى منك اختيار نوع التذكرة حسب المشكلة التي تواجهك**`
          )
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setColor(`${settings.HEX}`)
      ],
      components: [row],
      ephemeral: true,
    });
  }
});

client.on('interactionCreate', async interaction => {
if (!interaction.isSelectMenu()) return
if (interaction.customId == 'open_Ticket'){
const value = interaction.values[0];

if (value == 'TypeTicket-Defamation'){


  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("Create-Ticket")
      .setPlaceholder("قـم باخـتيـار نوع التذكرة │ ❗..")
      .addOptions([
        {
          label: "طلب مشهر",
          value: "TypeCreate-Defamation",
        },
        {
          label: "ازالة تشهير",
          value: "TypeCreate-UnDefamation",
        }
      ])
  );

  await interaction.update({
    embeds: [
      new MessageEmbed()
        .setDescription(
          `> **${emoji.Dot} يرجى منك اختيار نوع تذكرة التشهير**`
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setColor(`${settings.HEX}`)
    ],
    components: [row],
    ephemeral: true,
  });
}
}
});