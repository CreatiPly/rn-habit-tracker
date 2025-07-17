// import { Account, Client } from "react-native-appwrite";

// const myAppWriteClient = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
//   .setPlatform(process.env.NEXT_PUBLIC_APPWRITE_PLATFORM!);

// export const myAuthClient = new Account(myAppWriteClient);

import Constants from "expo-constants";
import { Account, Client, Databases } from "react-native-appwrite";

const {
  appwriteEndpoint,
  appwriteProjectId,
  appwritePlatform,
  appwriteDataBaseID,
  appwriteDBHabitsCollectionID,
  appwriteDBHabitsCompletionCollectionID,
} = Constants.expoConfig?.extra || {};

if (
  !appwriteEndpoint ||
  !appwriteProjectId ||
  !appwritePlatform ||
  !appwriteDataBaseID ||
  !appwriteDBHabitsCollectionID ||
  !appwriteDBHabitsCompletionCollectionID
) {
  throw new Error(
    "Appwrite configuration is missing in app.config.js or .env file"
  );
}

// main client
export const myAppWriteClient = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId)
  .setPlatform(appwritePlatform);

// auth client
export const myAuthClient = new Account(myAppWriteClient);

// database client
export const myDatabaseClient = new Databases(myAppWriteClient);
export const MY_DATABASE_ID = appwriteDataBaseID;
export const MY_HABITS_COLLECTION_ID = appwriteDBHabitsCollectionID;
export const MY_HABITS_COMPLETION_COLLECTION_ID =
  appwriteDBHabitsCompletionCollectionID;

export interface RealtimeResponse {
  events: string[];
  payload: any;
}
