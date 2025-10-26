import { View } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

import { Option } from "./Option";

import { TransactionTypes } from "@/utils/TransactionTypes";

type Props = {
  selected: TransactionTypes;
  onChange: (type: TransactionTypes) => void;
};

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Add"
        isSelected={selected === TransactionTypes.Income}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Income)}
      />
      <Option
        icon="arrow-downward"
        title="Withdraw"
        isSelected={selected === TransactionTypes.Outcome}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Outcome)}
      />
    </View>
  );
}
