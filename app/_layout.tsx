import { AuthProvider, useAuth } from "@/lib/authContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface AuthCheckerProps {
  children: React.ReactNode;
}
const AuthChecker = ({ children }: AuthCheckerProps) => {
  const router = useRouter();
  const { user: isAuthenticated, isLoadingUser } = useAuth();
  const screens = useSegments();

  useEffect(() => {
    const onAuthScreen = screens[0] === "auth";
    if (!isAuthenticated && !onAuthScreen && !isLoadingUser) {
      router.replace("/auth");
    } else if (isAuthenticated && onAuthScreen && !isLoadingUser) {
      router.replace("/");
    }
  }, [isAuthenticated, router, screens, isLoadingUser]);

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <AuthChecker>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </AuthChecker>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
