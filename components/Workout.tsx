import React from "react";
import { View, Text, FlatList } from "react-native";
import Exercise from "./Exercise";

const Workout = ({ workout }) => {
  return (
    <View>
      <Text>{workout.title}</Text>
      <FlatList
        data={workout.exercises}
        renderItem={(exercise) => <Exercise exercise={exercise.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Workout;
