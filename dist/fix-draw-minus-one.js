"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const minusOneDraw = await prisma.draw.findUnique({
        where: { onChainDrawId: -1 },
        include: { tickets: true },
    });
    if (!minusOneDraw) {
        console.log('No Draw with onChainDrawId = -1 found. Nothing to fix.');
        return;
    }
    const lastCompletedDraw = await prisma.draw.findFirst({
        where: { status: 'COMPLETED' },
        orderBy: { onChainDrawId: 'desc' },
    });
    const nextDrawId = lastCompletedDraw ? lastCompletedDraw.onChainDrawId + 1 : 1;
    console.log(`Found Draw -1 with ${minusOneDraw.tickets.length} tickets.`);
    console.log(`Targeting next Draw ID: ${nextDrawId}`);
    let targetDraw = await prisma.draw.findUnique({
        where: { onChainDrawId: nextDrawId },
    });
    if (!targetDraw) {
        targetDraw = await prisma.draw.create({
            data: {
                onChainDrawId: nextDrawId,
                winningNumbers: [],
                totalPrize: '0',
                status: 'PENDING',
                executedAt: new Date(),
            },
        });
        console.log(`Created new target draw with onChainDrawId ${nextDrawId}`);
    }
    await prisma.ticket.updateMany({
        where: { drawId: minusOneDraw.id },
        data: { drawId: targetDraw.id },
    });
    console.log(`Moved ${minusOneDraw.tickets.length} tickets successfully.`);
    await prisma.draw.delete({
        where: { id: minusOneDraw.id },
    });
    console.log('Deleted Draw -1 successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fix-draw-minus-one.js.map