const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gettokensupply")
        .setDescription("Fetch the current supply of a token mint")
        .addStringOption(option => option
            .setName('address')
            .setDescription('Token address')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const pubKey = interaction.options.getString('address')
            const response = await connection.getTokenLargestSupply(pubKey)
            if (JSON.stringify(response, null, 2).length > 2000) {
                const attachment = new AttachmentBuilder(Buffer.from(JSON.stringify(response, null, 2), 'utf-8'), { name: 'response.txt' })
                await interaction.editReply({content: `Response too long so now it's attached`, files: [attachment]})
                return
            }
            await interaction.editReply({content: "```" + JSON.stringify(response, null, 2) + "```"})
            return

        } catch (err) {
            console.log(err)
            await interaction.editReply({content: "**ERROR:**\n```" + err + "```"})
            return
        }

    },
};