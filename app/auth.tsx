import { useAuth } from "@/lib/authContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

const AuthPage = () => {
  const [signedUp, setSignedUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const { colors } = useTheme();
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError(null);

    if (signedUp) {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }

      router.replace("/");
    } else {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    }
  };

  const handleAuthSwitch = () => {
    setSignedUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {signedUp ? "Welcome Back" : "Create an account"}
        </Text>
        <TextInput
          label={"Email"}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label={"Password"}
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: colors.error }}>{error}</Text>}

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleAuth()}
        >
          {signedUp ? "Sign In" : "Sign Up"}
        </Button>
        <View style={styles.switchModeButton}>
          <Text>
            {signedUp ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Button onPress={() => handleAuthSwitch()}>
            {signedUp ? "Sign Up" : "Sign In"}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
});

export default AuthPage;
