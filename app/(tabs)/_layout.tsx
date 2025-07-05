import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="createHabit" options={{ title: "Create" }} />
      <Tabs.Screen name="streaks" options={{ title: "Streaks" }} />
    </Tabs>
  );
}
