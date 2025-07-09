import { useAuth } from "@/lib/authContext";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();

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
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}
