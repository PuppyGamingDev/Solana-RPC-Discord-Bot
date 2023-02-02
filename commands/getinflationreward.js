const { SlashCommandBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getinflationreward")
        .setDescription("Fetch the inflation reward for a list of addresses for an epoch")
        .addStringOption(option => option
            .setName('address')
            .setDescription('Address of account to query')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('epoch')
            .setDescription('Epoch to fetch')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const pubKey = new PublicKey(interaction.options.getString('address'))
            const epoch = interaction.options.getInteger('epoch')
            const response = await connection.getInflationReward(pubKey, epoch)
            await interaction.editReply({ content: "```" + JSON.stringify(response, null, 2) + "```" })
            return

        } catch (err) {
            console.log(err)
            await interaction.editReply({ content: "**ERROR:**\n```" + err + "```" })
            return
        }

    },
};