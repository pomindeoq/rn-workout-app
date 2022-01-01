import React from "react";
import { View, Text, FlatList } from "react-native";
import Workout from "../components/Workout";

const WorkoutScreen = ({ navigation, route }) => {
  const { workouts } = route.params;

  return (
    <View>
      <FlatList
        data={workouts}
        renderItem={(workout) => <Workout workout={workout.item} />}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default WorkoutScreen;
