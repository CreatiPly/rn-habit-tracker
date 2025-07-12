import {
  myDatabaseClient,
  MYDATABASEID,
  MYDBCOLLECTIONID,
} from "@/lib/appwrite";
import { useAuth } from "@/lib/authContext";
import { Habit } from "@/types/databse.type";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";

export default function Index() {
  const [habit, setHabits] = useState<Habit[]>();

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
