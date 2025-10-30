import { Alert, View } from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Transaction, TransactionProps } from "@/components/Transaction";

import { TransactionTypes } from "@/utils/TransactionTypes";
import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { Loading } from "@/components/Loading";

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
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "$ 0.00",
    target: "$ 0.00",
    percentage: 0,
  });

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Error", "Couldn't load the target details");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);

    setIsFetching(false);
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
