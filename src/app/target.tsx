import { Button } from "@/components/Button";
import { Input } from "@/components/Input/index";
import { PageHeader } from "@/components/PageHeader";
import { Alert, View } from "react-native";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() && amount <= 0)
      return Alert.alert(
        "Missing target name or target value",
        "Fill the target name and the target value"
      );
    setIsProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount });
      Alert.alert("Success!", "Target updated successfully!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "It was not possible to update the target");
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });
      Alert.alert("New target", "New target created successfully", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "It was not possible to create the target");
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Error", "It was not possible to fetch the target details");
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Target"
        subtitle="Save money to reach your financial goal"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Target name"
          placeholder="Travel to other country"
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          label="Target value"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Save"
          onPress={() => handleSave()}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
