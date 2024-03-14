import { ISubscription } from "./domain/subscription";

export interface ISubscriptionRepository {
  all(): Promise<ISubscription[]>;
  find(id: number): Promise<ISubscription | null>;
  findByUserAndCode(
    user_id: number,
    code: string
  ): Promise<ISubscription | null>;
  store(entry: ISubscription): Promise<void>;
  update(entry: ISubscription): Promise<void>;
  remove(id: number): Promise<void>;
}
