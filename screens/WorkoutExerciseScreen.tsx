import React, { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { InitialExercisesState } from "../models/interfaces";
import WorkoutVideo from "../components/WorkoutVideo";
import Player from "../components/Player";

const deviceWidth = Dimensions.get("window").width;

const WorkoutExerciseScreen = ({ navigation }: any) => {
  const { currentExercise, exercises }: any =
    useSelector<InitialExercisesState>((state) => state.exercises);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
    });
  }, [navigation]);

  const leaveWorkout = (): void => {
    navigation.navigate("Summary");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentExercise.title ? currentExercise.title : "Get Ready"}
      </Text>
      <Player
        navigation={navigation}
        currentExercise={currentExercise}
        exercises={exercises}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      >
        <WorkoutVideo
          isPlaying={isPlaying}
          onLeave={leaveWorkout}
          videoUri={currentExercise.video}
        />
      </Player>
    </View>
  );
};

export default WorkoutExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    maxWidth: deviceWidth,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
