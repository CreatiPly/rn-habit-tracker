import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

interface AuthCheckerProps {
  children: React.ReactNode;
}
const AuthChecker = ({ children }: AuthCheckerProps) => {
  const router = useRouter();
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth");
    }
  });

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <AuthChecker>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthChecker>
  );
}
