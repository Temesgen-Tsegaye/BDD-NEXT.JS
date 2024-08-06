import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { container } from "tsyringe";
import { Subscribe } from "../actions/agentCommission";
import { createDiscount } from "../actions/createDiscoutn";
import { prisma } from "../config/db";
export default container;

export type Subscribe = typeof Subscribe;
export type CreateDiscount = typeof createDiscount;
function init() {
  container.register<PrismaClient>("db", {
    useFactory: () => prisma,
  });

  container.register<Subscribe>("Subscribe", {
    useFactory: () => Subscribe,
  });
  container.register<CreateDiscount>("Discount", {
    useFactory: () => createDiscount,
  });
}

init();
