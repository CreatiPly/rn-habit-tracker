import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

const CreateHabit = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");

  return (
    <View style={styles.container}>
      <TextInput
        label={"Title"}
        mode="outlined"
        style={styles.input}
        onChangeText={setTitle}
      />
      <TextInput
        label={"Description"}
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
        />
      </View>
      <Button mode="contained">Add Habit</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },

  input: {
    marginBottom: 16,
  },

  frequencyContainer: {
    marginBottom: 24,
  },
});

export default CreateHabit;
