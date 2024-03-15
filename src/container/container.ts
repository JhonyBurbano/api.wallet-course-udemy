import { createContainer, asClass } from "awilix";
import { TestService } from "../services/test.service";
import express from "express";
import { scopePerRequest } from "awilix-express";
import { SubscriptionMySQLRepository } from "../services/repositories/implementation/mysql/subscription.repository";
import { SubscriptionService } from "../services/subscription.service";
import { MovementMySQLRepository } from "../services/repositories/implementation/mysql/movement.repository";
import { MovementService } from "../services/movement.service";
import { BalanceMysqlRepository } from "../services/repositories/implementation/mysql/balance.repository";

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    // Repositories
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
    movementRepository: asClass(MovementMySQLRepository).scoped(),
    balanceRepository: asClass(BalanceMysqlRepository).scoped(),
    // Services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    testService: asClass(TestService).scoped(),
  });

  app.use(scopePerRequest(container));
};
