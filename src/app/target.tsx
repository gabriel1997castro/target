import { Button } from "@/components/Button";
import { Input } from "@/components/Input/index";
import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Target"
        subtitle="Save money to reach your financial goal"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Target name" placeholder="Travel to other country" />
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}
