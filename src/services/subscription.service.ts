import { ApplicationException } from "../common/exceptions/application.exceptions";
import { ISubscription } from "./repositories/domain/subscription";
import { ISubscriptionRepository } from "./repositories/subscription.repository";

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  public async find(id: number): Promise<ISubscription | null> {
    return await this.subscriptionRepository.find(id);
  }

  public async all(): Promise<ISubscription[]> {
    return await this.subscriptionRepository.all();
  }

  public async store(entry: SubscriptionCreateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(
      entry.user_id,
      entry.code
    );

    if (!originalEntry) {
      await this.subscriptionRepository.store(entry as ISubscription);
    } else {
      throw new ApplicationException("User subscription already exists.");
    }
  }

  public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
    let originalEntry = await this.subscriptionRepository.find(id);

    if (originalEntry) {
      originalEntry.code = entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;

      await this.subscriptionRepository.update(originalEntry);
    } else {
      throw new ApplicationException("subscription not found.");
    }
  }

  public async remove(id: number): Promise<void> {
    await this.subscriptionRepository.remove(id);
  }
}
