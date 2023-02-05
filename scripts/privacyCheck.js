const { ethers } = require("hardhat")
const hre = require("hardhat")

const contractAddress = "0x6f522F4273c0B2c198008564551BE6c89fED94E6"

async function privacy() {
    //   const storage = await hre.ethers.getContractAt(contractAddress);

    for (let i = 0; i < 7; i++) {
        let value = await ethers.provider.getStorageAt(contractAddress, "0x".concat(i))
        console.log("---------------------------------------")
        console.log(`Value stored at 0x${i}: ${value}`)
    }
}

privacy().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
