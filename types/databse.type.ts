import { Models } from "react-native-appwrite";

export interface Habit extends Models.Document {
  user_id: string;
  title: string;
  description?: string;
  streak_count: number;
  last_completed: string;
  frequency: string;
  created_at: string;
}
