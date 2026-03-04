import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Web3Service } from './src/web3/web3.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const web3Service = app.get(Web3Service);

    try {
        const txHash = '0x700c7109c7ae4aae240c87797b16a0c2511d31a26e2111360614c7ad0edf4ea4';
        console.log(`Backfilling transaction: ${txHash}`);
        await web3Service.backfillTicketFromTxHash(txHash);
        console.log('Backfill complete.');
    } catch (e) {
        console.error('Error during backfill:', e);
    } finally {
        await app.close();
    }
}

bootstrap();
