import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Web3Service } from './src/web3/web3.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const web3Service = app.get(Web3Service);

    console.log('Running backfillAllDraws...');
    const result = await web3Service.backfillAllDraws();
    console.log('Result:', result);

    await app.close();
}
bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
