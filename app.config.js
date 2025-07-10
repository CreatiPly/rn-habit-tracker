import "dotenv/config";

export default {
  expo: {
    name: "rn_habit_tracker",
    slug: "rn_habit_tracker",
    version: "1.0.0",
    extra: {
      appwriteEndpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
      appwritePlatform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
      appwriteDataBaseID: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
      appwriteDBCollectionID: process.env.EXPO_PUBLIC_APPWRITE_DB_COLLECTION_ID,
    },
  },
};
