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
  appwriteDBCollectionID,
} = Constants.expoConfig?.extra || {};

if (
  !appwriteEndpoint ||
  !appwriteProjectId ||
  !appwritePlatform ||
  !appwriteDataBaseID ||
  !appwriteDBCollectionID
) {
  throw new Error(
    "Appwrite configuration is missing in app.config.js or .env file"
  );
}

// main client
const myAppWriteClient = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId)
  .setPlatform(appwritePlatform);

// auth client
export const myAuthClient = new Account(myAppWriteClient);

// database client
export const myDatabaseClient = new Databases(myAppWriteClient);
export const MYDATABASEID = appwriteDataBaseID;
export const MYDBCOLLECTIONID = appwriteDBCollectionID;
