import { IBalance } from "./domain/balance";

export interface BalanceRepository {
  find(id: number): Promise<IBalance | null>;
  findByUserId(userId: number): Promise<IBalance | null>;
  all(): Promise<IBalance[]>;
  store(entry: IBalance): Promise<void>;
  update(entry: IBalance): Promise<void>;
  remove(id: number): Promise<void>;
}
