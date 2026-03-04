import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const draws = await prisma.draw.findMany({
        include: { tickets: true },
        orderBy: { id: 'desc' }
    });
    console.log("Draws:");
    console.dir(draws, { depth: null });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
