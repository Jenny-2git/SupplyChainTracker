import { Contract } from "ethers";
import { connectWallet } from "./web3";

import SupplyChain from "../contracts/SupplyChain.json";

const CONTRACT_ADDRESS =//"0x26F2DBE5dFC95DE6E713E2Cb8217365B2b871591";
"0x04CB0aBA89174f53C8Fb9514F7eC365899f7BC33";
export async function getContract() {

    const { signer } = await connectWallet();

    return new Contract(
        CONTRACT_ADDRESS,
        SupplyChain.abi,
        signer
    );
}