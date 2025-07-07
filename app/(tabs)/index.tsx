import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is a habit tracker app</Text>
      <Text>This chnage is for the streak 😅</Text>
    </View>
  );
}
