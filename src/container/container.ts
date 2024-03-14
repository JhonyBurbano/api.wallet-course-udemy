import { createContainer, asClass } from "awilix";
import { TestService } from "../services/test.service";
import express from "express";
import { scopePerRequest } from "awilix-express";
import { SubscriptionMySQLRepository } from "../services/repositories/implementation/mysql/subscription.repository";
import { SubscriptionService } from "../services/subscription.service";

export default (app: express.Application) => {
  const container = createContainer({
    injectionMode: "CLASSIC",
  });

  container.register({
    // Repositories
    subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
    // Services
    subscriptionService: asClass(SubscriptionService).scoped(),
    testService: asClass(TestService).scoped(),
  });

  app.use(scopePerRequest(container));
};
