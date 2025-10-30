import { useState } from "react";
import { Alert, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionType } from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionDatabase";

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState(TransactionTypes.Income);
  const [isCreating, setIsCreating] = useState(false);

  const transactionsDatabase = useTransactionsDatabase();

  const params = useLocalSearchParams<{ id: string }>();

  async function handleCreate() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert(
          "Attention",
          "Fill the amount. The transaction should be greater than 0"
        );
      }

      setIsCreating(true);

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Outcome ? amount * -1 : amount,
        description,
      });

      Alert.alert("Success", "Transaction saved successfully!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "It was not possible to save the transaction!");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="New Transaction"
        subtitle="With each amount saved, you get closer to your goal. Make an effort to save and avoid withdrawing."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Value ($)"
          value={amount}
          onChangeValue={setAmount}
        />

        <Input
          label="Description"
          placeholder="Ex: Invest in 110% CDB at PagBank"
          value={description}
          onChangeText={setDescription}
        />

        <Button title="Add" onPress={handleCreate} isProcessing={isCreating} />
      </View>
    </View>
  );
}
