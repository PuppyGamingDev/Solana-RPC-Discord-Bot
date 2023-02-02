# Solana RPC Discord Bot
## About
This bot covers the RPC calls for Solana using the @solana/web3.js package for easily testing calls and checking responses from right inside Discord without needing to write CURL requests and such. Also it was for fun.

## Getting Started
### Requirements
- NodeJS v16+ due to the Discord JS requirements
- A Discord Application / Bot created [GUIDE HERE](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

### Modules & Credentials
After cloning the repo, install the required modules with `npm install` or `npm i discord.js @solana/web3.js dotenv`

The create a new file called `.env` and add the following to it;
```
TOKEN=
CLIENTID=
ENDPOINT=
```
Fill it in with the following values;
- TOKEN - You Discord Bot's token
- CLIENTID - The Discord Application's Client ID (OAUTH2 > General page)
- ENDPOINT - Solana RPC Endpoint (Get a nice free one through [QuickNode](https://www.quicknode.com?tap_a=67226-09396e&tap_s=3536451-d11bb1&utm_source=affiliate&utm_campaign=generic&utm_content=affiliate_landing_page&utm_medium=generic))

The run `node deploy-commands.js` to regiser the commands to the Discord Application.

### Get Going
Invite the bot to your server using the OAUTH2 > URL Generator in the Discord Application Dashboard, in the first area you need to select `bot` and `application.commands` then in the permissions box select `Send Messages`, `Embed Links` and `Attach Files`. 

Copy the URL that is generated below and paste it into your browser and invite the bot to your server. Once the bot is in, run `node bot.js` in the console to start the bot up and you should see `Solana RPC Bot is running!`

### Have A Play!
You can then start typing `/` and the commands should show above the text input areas.

If a response is too long for Discord chat, the bot will attach a `.txt` file containing the response.

## Commands Available
```
getAccountInfo
getAccountInfoAndContext
getAddressLookupTable
getBalance
getBalanceAndContext
getBlockHeight
getBlockProduction
getBlocks
getBlockSignatures
gerBlockTime
getClusterNodes
getEpochInfo
getEpochSchedule
getFirstAvailableBlock
getGenesisHash
getInflationGovernor
getInflationRate
getInflationReward
getLargestAccounts
getLatestBlockhash
getLatestBlockhashAndContext
getLeaderSchedule
getMinimumLedgerSlot
getNonce
getNonceAndContext
getParsedAccountInfo
getParsedProgramAccounts
getParsedTransaction
getProgramAccounts
getRecentPerformanceSamples
getSignaturesForAddress
getSignatureStatus
getSlot
getSlotLeader
getStakeActivation
getStakeMinimumDelegation
getSupply
getTokenAccountsByOwner
getTokenLargestAccounts
getTokenSupply
getTotalSupply
getTransactionCount
getVersion
getVoteAccount
```

> Credits go to the Discord and Solana development teams for creating the Packages and myself for sitting there typing it all in.
