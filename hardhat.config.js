require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.0" }, { version: "0.6.12" }, { version: "0.8.6" }],
    },
    dafaultNetwork: "localhost",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
    },
}
