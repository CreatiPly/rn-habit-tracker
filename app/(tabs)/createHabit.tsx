// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import { Button, SegmentedButtons, TextInput } from "react-native-paper";

// const FREQUENCIES = ["daily", "weekly", "monthly"];
// type Frequency = (typeof FREQUENCIES)[number];

// const CreateHabit = () => {
//   const [title, setTitle] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [frequency, setFrequency] = useState<Frequency>("daily");

//   return (
//     <View style={styles.container}>
//       <TextInput
//         label={"Title"}
//         mode="outlined"
//         style={styles.input}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         label={"Description"}
//         mode="outlined"
//         style={styles.input}
//         onChangeText={setDescription}
//       />
//       <View style={styles.frequencyContainer}>
//         <SegmentedButtons
//           buttons={FREQUENCIES.map((freq) => ({
//             value: freq,
//             label: freq.charAt(0).toUpperCase() + freq.slice(1),
//           }))}
//           value={frequency}
//           onValueChange={(value) => setFrequency(value as Frequency)}
//         />
//       </View>
//       <Button mode="contained">Add Habit</Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//     justifyContent: "center",
//   },

//   input: {
//     marginBottom: 16,
//   },

//   frequencyContainer: {
//     marginBottom: 24,
//   },
// });

// export default CreateHabit;

import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

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
        <AnimatedSegmentedButtons
          selectedValue={frequency}
          onChange={(value) => setFrequency(value as Frequency)}
        />
      </View>
      <Button mode="contained">Add Habit</Button>
    </View>
  );
};

function AnimatedSegmentedButtons({
  selectedValue,
  onChange,
}: {
  selectedValue: Frequency;
  onChange: (val: Frequency) => void;
}) {
  return (
    <View style={segmentedStyles.container}>
      {FREQUENCIES.map((freq) => (
        <AnimatedButton
          key={freq}
          label={freq.charAt(0).toUpperCase() + freq.slice(1)}
          value={freq}
          selected={selectedValue === freq}
          onPress={() => onChange(freq)}
        />
      ))}
    </View>
  );
}

function AnimatedButton({
  label,
  value,
  selected,
  onPress,
}: {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const background = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(background, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: false,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: false,
      friction: 4,
    }).start();
  };

  const bgColor = background.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0e0e0", "#6200ee"],
  });

  return (
    <Pressable
      onPressIn={animateIn}
      onPressOut={animateOut}
      onPress={onPress}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={[
          segmentedStyles.button,
          {
            transform: [{ scale }],
            backgroundColor: bgColor,
          },
        ]}
      >
        <Text
          style={[segmentedStyles.text, { color: selected ? "#fff" : "#000" }]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

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
    marginBottom: 40,
  },
});

const segmentedStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingVertical: 10, // ✅ increase vertical space inside
    paddingHorizontal: 8,
    minHeight: 44, // ✅ ensures proper touch target (good for accessibility)
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default CreateHabit;
