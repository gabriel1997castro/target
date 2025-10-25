import { View } from "react-native";
import { router } from "expo-router";
import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";

const summary = {
  total: "R$ 2.680,00",
  incomes: { label: "Incomes", value: "R$ 6.184,90" },
  outcomes: { label: "Outcomes", value: "R$ 884,90" },
};

const targets = [
  {
    id: "1",
    name: "Apple Watch",
    current: "R$ 580,00",
    percentage: "50%",
    target: "R$ 1.700,00",
  },
  {
    id: "2",
    name: "Buy an ergonomic chair",
    current: "R$ 900,00",
    percentage: "75%",
    target: "R$ 1.200,00",
  },
  {
    id: "3",
    name: "Trip to United States",
    current: "R$ 9.500,00",
    percentage: "48%",
    target: "R$ 20.000,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
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
