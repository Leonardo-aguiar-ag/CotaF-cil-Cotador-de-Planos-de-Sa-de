import { PrismaClient, PlanCategory, AccommodationType, CopayType, CoverageType } from "@prisma/client";
const prisma = new PrismaClient();

const AGE_BANDS = [
  [0, 18], [19, 23], [24, 28], [29, 33], [34, 38],
  [39, 43], [44, 48], [49, 53], [54, 58], [59, 120],
];

async function main() {
  const hapvida = await prisma.operator.create({
    data: { name: "Hapvida", logoPath: "/logos/hapvida.svg" },
  });
  const amil = await prisma.operator.create({
    data: { name: "Amil", logoPath: "/logos/amil.svg" },
  });

  const hapvidaTable = await prisma.priceTable.create({
    data: {
      operatorId: hapvida.id,
      name: "Hapvida SP Capital",
      region: "RMSP",
      state: "SP",
      city: "São Paulo",
      category: PlanCategory.PF,
    },
  });

  const planosHapvida = [
    { name: "Nosso Médico RMSP", accommodation: AccommodationType.ENFERMARIA, copay: CopayType.PARCIAL, coverage: CoverageType.REDE_PROPRIA, base: 189.9 },
    { name: "Smart UP",         accommodation: AccommodationType.ENFERMARIA, copay: CopayType.TOTAL,   coverage: CoverageType.REDE_PROPRIA, base: 149.9 },
    { name: "Referência",       accommodation: AccommodationType.APARTAMENTO, copay: CopayType.SEM,    coverage: CoverageType.AMPLA,        base: 389.9 },
  ];

  for (const p of planosHapvida) {
    const plan = await prisma.plan.create({
      data: {
        tableId: hapvidaTable.id,
        name: p.name,
        accommodation: p.accommodation,
        copay: p.copay,
        coverage: p.coverage,
        ambulatorial: true,
        refundInfo: p.copay === CopayType.SEM ? "Reembolso parcial" : null,
        registrationFee: 49.9,
      },
    });

    const prices = AGE_BANDS.map(([minAge, maxAge], i) => ({
      planId: plan.id,
      minAge,
      maxAge,
      price: +(p.base * Math.pow(1.18, i)).toFixed(2),
    }));
    await prisma.priceRule.createMany({ data: prices });
  }

  console.log("Seed concluído.");
}

main().finally(() => prisma.$disconnect());
