

import { Contract } from "ethers";
import { connectWallet } from "./web3";
import SupplyChain from "../contracts/SupplyChain.json";


export const CONTRACT_ADDRESS ="0x10A576773134Ba3a6e717886b39Ea9AD1dE744Ac";

export async function getContract() {

  console.log("Contract Address:", CONTRACT_ADDRESS);
  const { signer } = await connectWallet();

  return new Contract(
    CONTRACT_ADDRESS,
    SupplyChain.abi,
    signer
  );
  
}