import { Alert, View } from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { Loading } from "@/components/Loading";

import { TransactionTypes } from "@/utils/TransactionTypes";
import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionDatabase";
import dayjs from "dayjs";

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "$ 0.00",
    target: "$ 0.00",
    percentage: 0,
  });
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Error", "It was not possible to fetch the target details");
      console.log(error);
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id)
      );

      setTransactions(
        response.map((transaction) => ({
          id: String(transaction.id),
          value: numberToCurrency(transaction.amount),
          date: dayjs(transaction.created_at).format("MM/DD/YYYY [,] hh:mm"),
          description: transaction.description,
          type:
            transaction.amount >= 0
              ? TransactionTypes.Income
              : TransactionTypes.Outcome,
        }))
      );
    } catch (error) {
      Alert.alert("It was not possible to load transactions");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchTargetDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchTargetDetailsPromise, fetchTransactionsPromise]);

    setIsFetching(false);
  }

  async function handleRemoveTransaction(id: string) {
    Alert.alert("Remove transaction", "Do you really want to remove?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => removeTransaction(id) },
    ]);
  }

  async function removeTransaction(id: string) {
    try {
      await transactionsDatabase.remove(Number(id));
      fetchData();
      Alert.alert("Removed", "Transaction removed successfully!");
    } catch (error) {
      Alert.alert("Error", "It was not possible to remove the transaction");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) return <Loading />;

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transactions"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleRemoveTransaction(item.id)}
          />
        )}
        emptyMessage="No Transactions. Touch in new transaction to add your money here"
      />

      <Button
        title="New transaction"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
