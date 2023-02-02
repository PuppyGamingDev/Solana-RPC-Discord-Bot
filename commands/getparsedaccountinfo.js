const { SlashCommandBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getparsedaccountinfo")
        .setDescription("Fetch parsed account info for the specified public key")
        .addStringOption(option => option
            .setName('address')
            .setDescription('Address of account to query')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const pubKey = new PublicKey(interaction.options.getString('address'))
            const response = await connection.getParsedAccountInfo(pubKey)
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