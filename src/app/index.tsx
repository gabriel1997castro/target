import { Text, View, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Expo router</Text>

      <Button title="New Target" onPress={() => router.navigate("/target")} />
      <Button
        title="Transaction"
        onPress={() => router.navigate("/transaction/135")}
      />
      <Button
        title="Progress"
        onPress={() => router.navigate("/in-progress/13")}
      />
    </View>
  );
}
