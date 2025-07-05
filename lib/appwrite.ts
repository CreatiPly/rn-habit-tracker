import { Account, Client } from "react-native-appwrite";

const myAppWriteClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.NEXT_PUBLIC_APPWRITE_PLATFORM!);

const myAuthClient = new Account(myAppWriteClient);
