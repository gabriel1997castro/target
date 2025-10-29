import { useCallback, useState } from "react";
import { View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { HomeHeader } from "@/components/HomeHeader";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { useTargetDatabase } from "@/database/useTargetDatabase";

const summary = {
  total: "R$ 2.680,00",
  incomes: { label: "Incomes", value: "R$ 6.184,90" },
  outcomes: { label: "Outcomes", value: "R$ 884,90" },
};

export default function Index() {
  const [targets, setTargets] = useState<TargetProps[]>();
  const targetDatabase = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: String(item.amount),
      }));
    } catch (error) {
      Alert.alert("Error", "It was not possible to load the targets");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

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
