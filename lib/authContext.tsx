import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { myAuthClient } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await myAuthClient.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await myAuthClient.create(ID.unique(), email, password);
      await signIn(email, password);
      return null; // Return null on success
    } catch (error) {
      if (error instanceof Error) {
        return error.message; // Return error message on failure
      }
      return "An unexpected error occurred during signup"; // Fallback error message
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await myAuthClient.createEmailPasswordSession(email, password);
      const session = await myAuthClient.get();
      setUser(session);
      return null; // Return null on success
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }

      return "An error occured during sign in";
    }
  };

  const signOut = async () => {
    try {
      await myAuthClient.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
