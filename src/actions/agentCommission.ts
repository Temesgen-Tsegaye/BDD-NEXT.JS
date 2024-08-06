import { PrismaClient } from "@prisma/client";

import container from "../DI/di";
export async function Subscribe(
  promoCode: string,
  plan: "yearly" | "weekly" | "monthly"
) {

  const prisma = container.resolve<PrismaClient>("db");
  const agent = await prisma.agent.findUnique({
    where: { promoCode: promoCode },
  });
  const discount=await prisma.discount.findUnique({
    where: { agentId: agent?.id },
  })
  if (!agent) {
    return 0
  }
  
  const commision = await prisma.commission.findUnique({
    where: { agentId: agent.id },
  });
  if (!commision) {
    return 0
  }
  const subscription = await prisma.subscription.findUnique({
    where: { name: plan },
  });

 
  const commission =subscription!.price * commision[plan] -
    subscription!.price *discount![plan]
  return commission;
}
