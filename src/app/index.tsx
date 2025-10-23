import { Text, View, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";
import { HomeHeader } from "@/components/HomeHeader";

const summary = {
  total: "R$ 2.680,00",
  incomes: { label: "Incomes", value: "R$ 6.184,90" },
  outcomes: { label: "Outcomes", value: "R$ 884,90" },
};

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />
    </View>
  );
}
