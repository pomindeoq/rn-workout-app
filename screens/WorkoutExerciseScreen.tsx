import React, { useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { loadExercise } from "../redux/actions";

const WorkoutExerciseScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentExercise } = useSelector((state) => state.exercises);

  //   useEffect(() => {
  //     dispatch(loadExercise(0));
  //   }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentExercise.title ? currentExercise.title : "Get Ready"}
      </Text>
      <CountdownCircleTimer
        initialRemainingTime={5}
        isPlaying
        duration={10}
        size={120}
        colors={[
          ["#1de9b6", 0],
          ["#fe4081", 0],
        ]}
        onComplete={() => {
          dispatch(loadExercise(0));
          return [true, 0]; // repeat animation in 1.5 seconds
        }}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor }}>
            {remainingTime}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
    </View>
  );
};

export default WorkoutExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
