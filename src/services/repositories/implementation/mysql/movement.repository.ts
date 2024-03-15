import connector from "../../../../common/persistence/mysql.persistence";
import { IMovement } from "../../domain/movement";
import { MovementRepository } from "../../movement.repository";

export class MovementMySQLRepository implements MovementRepository {
  public async find(id: number): Promise<IMovement | null> {
    const [rows]: any[] = await connector.execute(
      "SELECT * FROM wallet_movement WHERE id = ?",
      [id]
    );

    if (rows.length) {
      return rows[0];
    }

    return null;
  }

  public async all(): Promise<IMovement[]> {
    const [rows]: any[] = await connector.execute(
      "SELECT * FROM wallet_movement ORDER BY id DESC"
    );

    return rows as IMovement[];
  }

  public async store(entry: IMovement): Promise<void> {
    const now = new Date();

    await connector.execute(
      "INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)",
      [entry.user_id, entry.type, entry.amount, now]
    );
  }

  public async update(entry: IMovement): Promise<void> {
    const now = new Date();

    await connector.execute(
      "UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, created_at = ? WHERE id = ?",
      [entry.user_id, entry.type, entry.amount, now, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await connector.execute("DELETE FROM wallet_movement WHERE id = ?", [id]);
  }
}
