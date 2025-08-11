import "dotenv/config";

export default {
  expo: {
    name: "TrackHab",
    slug: "rn_habit_tracker",
    icon: "./assets/images/icon.png",
    version: "1.0.0",
    extra: {
      appwriteEndpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
      appwritePlatform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
      appwriteDataBaseID: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
      appwriteDBHabitsCollectionID:
        process.env.EXPO_PUBLIC_APPWRITE_DB_COLLECTION_ID,
      appwriteDBHabitsCompletionCollectionID:
        process.env.EXPO_PUBLIC_APPWRITE_DB_HABITS_COMPLETION_COLLECTION_ID,
    },
  },
};
