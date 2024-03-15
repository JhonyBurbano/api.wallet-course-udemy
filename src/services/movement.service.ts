import { MovementType } from "../common/enums/movement-type";
import { ApplicationException } from "../common/exceptions/application.exceptions";
import { MovementCreateDto } from "../dtos/movement.dto";
import { BalanceRepository } from "./repositories/balance.repository";
import { IBalance } from "./repositories/domain/balance";
import { IMovement } from "./repositories/domain/movement";
import { MovementRepository } from "./repositories/movement.repository";

export class MovementService {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly balanceRepository: BalanceRepository
  ) {}

  public async find(id: number): Promise<IMovement | null> {
    return await this.movementRepository.find(id);
  }

  public async all(): Promise<IMovement[] | null> {
    return await this.movementRepository.all();
  }

  public async store(entry: MovementCreateDto): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(entry.user_id);

    switch (entry.type) {
      case MovementType.income:
        await this.income(entry, balance);
        break;
      case MovementType.outcome:
        await this.outcome(entry, balance);
        break;
      default:
        throw new ApplicationException("Invalid movement type supplied.");
    }
    if (entry.type === MovementType.income) {
    } else if (entry.type === MovementType.outcome) {
    } else {
    }
  }

  private async income(entry: MovementCreateDto, balance: IBalance | null) {
    if (!balance) {
      await this.balanceRepository.store({
        amount: entry.amount,
        user_id: entry.user_id,
      } as IBalance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }
    await this.movementRepository.store(entry as IMovement);
  }

  private async outcome(entry: MovementCreateDto, balance: IBalance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException("User does not have enough balance.");
    } else {
      balance.amount -= entry.amount;

      await this.balanceRepository.update(balance);
      await this.movementRepository.store(entry as IMovement);
    }
  }
}
