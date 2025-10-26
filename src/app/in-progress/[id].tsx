import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";

const details = { current: "$112", target: "$480", percentage: 25 };

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "$20,00",
    date: "12/04/25",
    type: TransactionTypes.Outcome,
  },
  {
    id: "2",
    value: "$300,00",
    date: "12/04/25",
    description: "CDB 110% Nubank",
    type: TransactionTypes.Income,
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{ icon: "edit", onPress: () => {} }}
      />

      <Progress data={details} />

      <List
        title="Transactions"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
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
