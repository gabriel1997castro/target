import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, Button } from "react-native";

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>In Progress: {params.id}</Text>

      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
