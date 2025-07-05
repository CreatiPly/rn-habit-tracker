import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const AuthPage = () => {
  const [signedUp, setSignedUp] = useState<boolean>(true);

  const handleAuthSwitch = () => {
    setSignedUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>{signedUp ? "Welcome Back" : "Create an account"}</Text>
        <TextInput
          label={"Email"}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
        />
        <TextInput
          label={"Password"}
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
        />
        <Button mode="contained">{signedUp ? "Sign In" : "Sign Up"}</Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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

export default AuthPage;
