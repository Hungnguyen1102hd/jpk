"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const web3_service_1 = require("./src/web3/web3.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const web3Service = app.get(web3_service_1.Web3Service);
    try {
        const txHash = '0x700c7109c7ae4aae240c87797b16a0c2511d31a26e2111360614c7ad0edf4ea4';
        console.log(`Backfilling transaction: ${txHash}`);
        await web3Service.backfillTicketFromTxHash(txHash);
        console.log('Backfill complete.');
    }
    catch (e) {
        console.error('Error during backfill:', e);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=backfill-ticket.js.map