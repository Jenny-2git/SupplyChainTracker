import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "paris",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  plugins: [hardhatEthers],

  networks: {
    ganache: {
      type: "http",
      url: process.env.GANACHE_URL!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
});