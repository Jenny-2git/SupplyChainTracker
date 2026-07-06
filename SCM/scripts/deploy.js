import hre from "hardhat";

async function main() {
  console.log("Deploying SupplyChain Contract...");

  // Get the Hardhat 3 connection
  const { ethers } = await hre.network.connect();

  // Get contract factory
  const SupplyChain = await ethers.getContractFactory("SupplyChain");

  // Deploy
  const supplyChain = await SupplyChain.deploy();

  // Wait until deployment is complete
  await supplyChain.waitForDeployment();

  const address = await supplyChain.getAddress();

  console.log("--------------------------------");
  console.log("✅ SupplyChain deployed successfully!");
  console.log("Contract Address:", address);
  console.log("--------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});