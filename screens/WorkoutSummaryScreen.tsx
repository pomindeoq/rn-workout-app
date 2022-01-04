import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { countExercisesDuration } from "../utils/exerciseUtils";
import OnScreenButton from "../components/OnScreenButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Exercise from "../components/Exercise";
import { InitialExercisesState } from "../models/interfaces";

const WorkoutSummaryScreen = ({ navigation }: any) => {
  const { exercises } = useSelector(
    (state): InitialExercisesState => state.exercises
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
    });
  }, [navigation]);

  const handleSaveAndContinue = (): void => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        style={styles.marginBot}
        name="done"
        size={80}
        color="#1de9b6"
      />
      <Text style={[styles.title, styles.marginBot]}>Workout Completed!</Text>
      <Text style={[styles.description, styles.marginBot]}>
        Nice job! You're done. Here's the workout summary.
      </Text>
      <Text style={styles.marginBot}>Duration</Text>
      <Text style={[styles.number, styles.marginBot]}>
        {countExercisesDuration(exercises)}
      </Text>
      <FlatList
        data={exercises}
        renderItem={(exercise) => (
          <Exercise showImage={false} exercise={exercise.item} />
        )}
        keyExtractor={(item) => item.title}
      />
      <OnScreenButton
        title="Save & Continue"
        onPress={handleSaveAndContinue}
        color="#aa01fe"
        borderColor="#aa01fe"
        textColor="white"
      />
    </View>
  );
};

export default WorkoutSummaryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    color: "grey",
  },
  number: {
    fontWeight: "bold",
    fontSize: 22,
  },
  marginBot: {
    marginBottom: 15,
  },
});
