import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionType } from "@/components/TransactionType";
import { useState } from "react";
import { TransactionTypes } from "@/utils/TransactionTypes";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Income);
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="New Transaction"
        subtitle="With each amount saved, you get closer to your goal. Make an effort to save and avoid withdrawing."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput label="Value ($)" value={0} />

        <Input label="Reason" placeholder="Ex: Invest in 110% CDB at PagBank" />

        <Button title="Add" />
      </View>
    </View>
  );
}
