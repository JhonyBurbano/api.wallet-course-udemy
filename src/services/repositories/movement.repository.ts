import { IMovement } from "./domain/movement";

export interface MovementRepository {
  all(): Promise<IMovement[]>;
  find(id: number): Promise<IMovement | null>;
  store(entry: IMovement): Promise<void>;
  update(entry: IMovement): Promise<void>;
  remove(id: number): Promise<void>;
}
