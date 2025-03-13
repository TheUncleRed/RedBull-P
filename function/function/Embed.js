const { MessageEmbed } = require('discord.js');
const { settings } = require('../../index');

/**
 * @param {Object} data - The data object containing information for the embed
 * @param {Interaction} [data.interaction] - The interaction object (optional)
 * @param {string} data.title - The title of the embed
 * @param {string} data.image - The URL of the image to be displayed in the embed
 * @param {string} data.color - The color of the embed
 * @param {string} data.description - The description of the embed
 * @param {Array<{ name: string, value: string, inline?: boolean }>} data.fields - An array of field objects
 */
function createEmbed(data) {
    const { interaction, title, image, color, description, fields } = data;

    const embed = new MessageEmbed()
        .setAuthor(interaction?.guild?.name || null, interaction?.guild?.iconURL() || null)
        .setFooter(interaction?.guild?.name || null, interaction?.guild?.iconURL() || null)
        .setThumbnail(interaction?.guild?.iconURL() || null)
        .setTimestamp()
        .setColor(color || settings.لون_الامبيد);

    if (title !== undefined) {
        embed.setTitle(title);
    }

    if (image !== undefined) {
        embed.setImage(image);
    }

    if (description !== undefined) {
        embed.setDescription(description);
    }

    if (fields && fields.length > 0) {
        fields.forEach((field) => {
            embed.addField(field.name, field.value, field.inline || false);
        });
    }

    return embed;
}

module.exports = { createEmbed };
