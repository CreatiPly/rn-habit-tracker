import {
  myDatabaseClient,
  MYDATABASEID,
  MYDBCOLLECTIONID,
} from "@/lib/appwrite";
import { useAuth } from "@/lib/authContext";
import { Habit } from "@/types/databse.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>();

  const { signOut, user } = useAuth();

  useEffect(() => {
    fetchHabitsByUserId();
  }, [user]);

  const fetchHabitsByUserId = async () => {
    try {
      const fetchedHabits = await myDatabaseClient.listDocuments(
        MYDATABASEID,
        MYDBCOLLECTIONID,
        [Query.equal("user_id", user?.$id ?? "")]
      );

      setHabits(fetchedHabits.documents as Habit[]);
      // console.log("Fetched habits:", fetchedHabits.documents);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Your Habits
        </Text>
        <Button onPress={signOut} icon={"logout"}>
          Sign Out
        </Button>
      </View>

      {habits?.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No habits yet. Add your first Habit
          </Text>
        </View>
      ) : (
        habits?.map((habit, key) => (
          <Surface key={key} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{habit.title}</Text>
              <Text style={styles.cardDescription}>{habit.description}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.streakBadge}>
                  <MaterialCommunityIcons
                    name="fire"
                    color={"#ff9800"}
                    size={18}
                  />
                  <Text style={styles.streakText}>
                    {habit.streak_count} day streak
                  </Text>
                </View>
                <View style={styles.frequencyBadge}>
                  <Text style={styles.frequencyText}>
                    {habit.frequency.charAt(0).toUpperCase() +
                      habit.frequency.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </Surface>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },

  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardCompleted: {
    opacity: 0.6,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666",
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#4caf50",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
});
