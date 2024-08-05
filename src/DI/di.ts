import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { container } from "tsyringe";
import { Subscribe } from "../actions/agentCommission";
import { prisma } from "../config/db";
export default container;

export type Subscribe = typeof Subscribe;

function init() {
  container.register<PrismaClient>("db", {
    useFactory: () => prisma,
  });

  container.register<Subscribe>("Subscribe", {
    useFactory: () => Subscribe,
  });
}

init();
