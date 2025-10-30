import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number;
  amount: number;
  description?: string;
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

  return { create };
}
