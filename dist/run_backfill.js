"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const web3_service_1 = require("./src/web3/web3.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const web3Service = app.get(web3_service_1.Web3Service);
    console.log('Running backfillAllDraws...');
    const result = await web3Service.backfillAllDraws();
    console.log('Result:', result);
    await app.close();
}
bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=run_backfill.js.map