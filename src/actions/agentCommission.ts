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
  console.log(agent, 'agent');
  if (!agent) {
    return 0
  }
  
  const commision = await prisma.commission.findUnique({
    where: { agentId: agent.id },
  });
   console.log(plan,'plan')
  console.log(commision, 'commision');
  if (!commision) {
    console.log('no commission');
    return 0
  }
  const subscription = await prisma.subscription.findUnique({
    where: { name: plan },
  });

  console.log(subscription!.price, 'subscription');
  console.log(commision, 'commi');
  console.log(agent.discountPercentage, 'dis');
  const commission =subscription!.price * commision[plan] -
    subscription!.price * agent.discountPercentage;
  return commission;
}
