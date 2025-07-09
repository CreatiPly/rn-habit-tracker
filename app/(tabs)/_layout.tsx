// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#f5f5f5",
//         },
//         headerShadowVisible: false,
//         tabBarStyle: {
//           backgroundColor: "#f5f5f5",
//           borderTopWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//         },
//         tabBarActiveTintColor: "#6200ee",
//         tabBarInactiveTintColor: "#666666",
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Habits",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons
//               name="calendar-today"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="createHabit"
//         options={{
//           title: "Create Habit",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons
//               name="plus-circle-outline"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="streaks"
//         options={{
//           title: "Streaks",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="fire" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";

function AnimatedTabButton(props: BottomTabBarButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPressIn={animateIn}
      onPressOut={animateOut}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      accessibilityRole={props.accessibilityRole}
      accessibilityState={props.accessibilityState}
      accessibilityLabel={props.accessibilityLabel}
      testID={props.testID}
      style={props.style}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale }],
            opacity,
            flex: 1, // ✅ preserve layout height
            justifyContent: "center", // ✅ vertically center
            alignItems: "center", // ✅ horizontally center
          },
          props.style,
        ]}
      >
        {props.children}
      </Animated.View>
    </Pressable>
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 6,
          paddingTop: 4,
          height: 80,
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666666",
        tabBarButton: (props: BottomTabBarButtonProps) => (
          <AnimatedTabButton {...props} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createHabit"
        options={{
          title: "Create Habit",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fire" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
