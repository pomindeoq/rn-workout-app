import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Exercise from "./Exercise";

const Workout = ({ workout }) => {
  return (
    <View style={[styles.center, styles.item]}>
      <Text style={styles.title}>{workout.title}</Text>
      <FlatList
        data={workout.exercises}
        renderItem={(exercise) => <Exercise exercise={exercise.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 14,
  },
  item: {
    paddingBottom: 15,
    paddingTop: 10,
    borderColor: "lightgrey",
    borderTopWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
