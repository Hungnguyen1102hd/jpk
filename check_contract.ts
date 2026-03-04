import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC_URL);
const abi = [
  'function currentDrawId() view returns (uint256)',
  'function drawFinalized(uint256) view returns (bool)',
];

async function main() {
  const contract = new ethers.Contract(process.env.LOTTERY_CONTRACT_ADDRESS!, abi, provider);
  const currentDrawId = await contract.currentDrawId();
  console.log('Current drawId:', currentDrawId.toString());

  if (currentDrawId > 0n) {
    const finalized = await contract.drawFinalized(0n);
    console.log('Is draw 0 finalized?', finalized);
    if (currentDrawId > 1n) {
      const finalized1 = await contract.drawFinalized(1n);
      console.log('Is draw 1 finalized?', finalized1);
    }
  }
}

main().catch(console.error);
