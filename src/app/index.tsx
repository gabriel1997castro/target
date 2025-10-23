import { Text, View, Button } from "react-native";
import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";
import { HomeHeader } from "@/components/HomeHeader";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={{ total: "R$ 2680,00" }} />
    </View>
  );
}
