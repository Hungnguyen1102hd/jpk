import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC_URL);

const abi = [
  'function currentDrawId() view returns (uint256)',
  'function drawFinalized(uint256) view returns (bool)',
  'function winningNumbers(uint256, uint256) view returns (uint8)',
];

async function main() {
  const contract = new ethers.Contract(process.env.LOTTERY_CONTRACT_ADDRESS!, abi, provider);
  const currentDrawIdBigInt = await contract.currentDrawId();
  const currentDrawId = Number(currentDrawIdBigInt);

  for (let drawId = 0; drawId < currentDrawId; drawId++) {
    const finalized = await contract.drawFinalized(drawId);
    if (finalized) {
      const numbers: number[] = [];
      for (let i = 0; i < 6; i++) {
        const num = await contract.winningNumbers(drawId, i);
        numbers.push(Number(num));
      }
      console.log(`Draw ${drawId} finalized with numbers:`, numbers);

      await prisma.draw.upsert({
        where: { onChainDrawId: drawId },
        update: {
          winningNumbers: numbers,
          status: 'COMPLETED',
        },
        create: {
          onChainDrawId: drawId,
          winningNumbers: numbers,
          totalPrize: '0',
          status: 'COMPLETED',
          executedAt: new Date(),
        },
      });
      console.log(`Draw ${drawId} backfilled to DB successfully.`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
