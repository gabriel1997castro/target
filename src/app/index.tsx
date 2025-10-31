import { useCallback, useState } from "react";
import { View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { Loading } from "@/components/Loading";

import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTransactionsDatabase } from "@/database/useTransactionDatabase";

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>();
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listByClosestTarget();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Error", "It was not possible to load the targets");
      console.log(error);
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await transactionsDatabase.summary();

      return {
        total: numberToCurrency(response.income + response.outcome),
        income: {
          label: "Incomes",
          value: numberToCurrency(response.income),
        },
        outcome: {
          label: "Outcomes",
          value: numberToCurrency(response.outcome),
        },
      };
    } catch (error) {
      Alert.alert("Error", "It was not possible to load the summary");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const summaryDataPromise = fetchSummary();

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryDataPromise,
    ]);

    setTargets(targetData);
    setSummary(summaryData);

    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        title="Target"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="No targets. Touch on new target to create"
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="New target" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
