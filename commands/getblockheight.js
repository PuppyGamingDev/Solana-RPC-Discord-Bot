const { SlashCommandBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getblockheight")
        .setDescription("No description")
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const response = await connection.getBlockHeight()
            await interaction.editReply({content: "```" + JSON.stringify(response, null, 2) + "```"})
            return

        } catch (err) {
            console.log(err)
            await interaction.editReply({content: "**ERROR:**\n```" + err + "```"})
            return
        }

    },
};