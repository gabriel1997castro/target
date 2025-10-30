import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number;
  amount: number;
  description?: string;
};

export type TransactionResponse = {
  id: number;
  target_id: number;
  amount: number;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export function useTransactionsDatabase() {
  const database = useSQLiteContext();

  async function create(data: TransactionCreate) {
    const statement = await database.prepareAsync(`
      INSERT INTO transactions
        (target_id, amount, description)
      VALUES
        ($target_id, $amount, $description)
    `);

    statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $description: data.description,
    });
  }

  function listByTargetId(id: number) {
    return database.getAllAsync<TransactionResponse>(`
        SELECT id, target_id, amount, description, created_at, updated_at
        FROM transactions
        WHERE target_id = ${id}
        ORDER BY created_at DESC
      `);
  }

  return { create, listByTargetId };
}
