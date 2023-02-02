const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { PublicKey } = require('@solana/web3.js')
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getblocks")
        .setDescription("Fetch confirmed blocks between two slots")
        .addIntegerOption(option => option
            .setName('blockstart')
            .setDescription('Block number')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('blockend')
            .setDescription('Block number')
            .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client, connection) {
        await interaction.deferReply()
        try {
            const blocks = interaction.options.getInteger('blockstart')
            const blocke = interaction.options.getInteger('blockend')
            const response = await connection.getBlocks(blocks, blocke)
            if (JSON.stringify(response, null, 2).length > 2000) {
                const attachment = new AttachmentBuilder(Buffer.from(JSON.stringify(response, null, 2), 'utf-8'), { name: 'response.txt' })
                await interaction.editReply({ content: `Response too long so now it's attached`, files: [attachment] })
                return
            }
            await interaction.editReply({ content: "```" + JSON.stringify(response, null, 2) + "```" })
            return

        } catch (err) {
            console.log(err)
            await interaction.editReply({ content: "**ERROR:**\n```" + err + "```" })
            return
        }

    },
};