const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gettokenaccountsbyowner")
        .setDescription("Fetch all the token accounts owned by the specified account")
        .addStringOption(option => option
            .setName('address')
            .setDescription('Address of account to query')
            .setRequired(true))
        .addStringOption(option => option
            .setName('filtertype')
            .setDescription('type of filter')
            .addChoices(
                { name: `Mint`, value: `mint` },
                { name: `Program ID`, value: `programid` }
            )
            .setRequired(true))
        .addStringOption(option => option
            .setName('filter')
            .setDescription('Token Account Filter')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const pubKey = new PublicKey(interaction.options.getString('address'))
            const choice = interaction.options.getString('filtertype')
            const filter = interaction.options.getString('filter')
            if (choice === "mint") {
                const response = await connection.getTokenAccountsByOwner(pubKey, { mint: new PublicKey(filter) })
                if (JSON.stringify(response, null, 2).length > 2000) {
                    const attachment = new AttachmentBuilder(Buffer.from(JSON.stringify(response, null, 2), 'utf-8'), { name: 'response.txt' })
                    await interaction.editReply({ content: `Response too long so now it's attached`, files: [attachment] })
                    return
                }
                await interaction.editReply({ content: "```" + JSON.stringify(response, null, 2) + "```" })
                return
            } else if (choice === "programid") {
                const response = await connection.getTokenAccountsByOwner(pubKey, { programId: new PublicKey(filter) })
                if (JSON.stringify(response, null, 2).length > 2000) {
                    const attachment = new AttachmentBuilder(Buffer.from(JSON.stringify(response, null, 2), 'utf-8'), { name: 'response.txt' })
                    await interaction.editReply({ content: `Response too long so now it's attached`, files: [attachment] })
                    return
                }
                await interaction.editReply({ content: "```" + JSON.stringify(response, null, 2) + "```" })
                return
            }

        } catch (err) {
            console.log(err)
            await interaction.editReply({ content: "**ERROR:**\n```" + err + "```" })
            return
        }

    },
};