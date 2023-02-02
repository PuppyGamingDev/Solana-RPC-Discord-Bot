const { SlashCommandBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getbalance")
        .setDescription("Fetch the balance for the specified public key")
        .addStringOption(option => option
            .setName('address')
            .setDescription('Address of account to query')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const pubKey = new PublicKey(interaction.options.getString('address'))
            const response = await connection.getBalance(pubKey)
            await interaction.editReply({content: "```" + JSON.stringify(response, null, 2) + "```"})
            return

        } catch (err) {
            console.log(err)
            await interaction.editReply({content: "**ERROR:**\n```" + err + "```"})
            return
        }

    },
};