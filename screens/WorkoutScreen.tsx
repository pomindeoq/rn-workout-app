import React, { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Workout from "../components/Workout";
import { useDispatch } from "react-redux";
import { saveExercises } from "../redux/actions";
import OnScreenButton from "../components/OnScreenButton";
import * as interfaces from "../models/interfaces";

const WorkoutScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const { workouts } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "#aa01fe",
    });
  }, [navigation]);

  const startWorkout = () => {
    const exercises = workouts
      .map((workout: interfaces.Workout) => workout.exercises)
      .flat();
    dispatch(saveExercises(exercises));
    navigation.navigate("Exercise");
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={workouts}
        renderItem={(workout) => <Workout workout={workout.item} />}
        keyExtractor={(item) => item.title}
      />
      <OnScreenButton title="Start Workout" onPress={startWorkout} />
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    margin: 20,
    marginBottom: 0,
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
