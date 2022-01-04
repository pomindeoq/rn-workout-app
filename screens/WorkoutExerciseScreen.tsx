import React, { useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { loadExercise, setProgress } from "../redux/actions";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Exercise, InitialExercisesState } from "../models/interfaces";
import WorkoutVideo from "../components/WorkoutVideo";

const deviceWidth = Dimensions.get("window").width;

const WorkoutExerciseScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { currentExercise, exercises }: any =
    useSelector<InitialExercisesState>((state) => state.exercises);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  let [index, setindex] = useState<number>(0);
  const video = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
    });
  }, [navigation]);

  const loadPrev = (): void => {
    if (index > 0) {
      dispatch(loadExercise(index - 1));
      setindex(index - 1);
    }
  };

  const loadNext = (): void => {
    if (index < exercises.length - 1) {
      dispatch(setProgress(currentExercise.id, "skipped"));
      dispatch(loadExercise(index + 1));
      setindex(index + 1);
    } else if (index === exercises.length - 1) {
      navigation.navigate("Summary");
    }
  };

  const handlePlayPause = (): void => {
    setIsPlaying((prev) => !prev);
  };

  const handleComplete = (): void => {
    if (index === exercises.length - 1) {
      navigation.navigate("Summary");
    } else {
      dispatch(setProgress(currentExercise.id, "completed"));
      dispatch(loadExercise(index));
      setindex(index + 1);
    }
  };

  const leaveWorkout = (): void => {
    navigation.navigate("Summary");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentExercise.title ? currentExercise.title : "Get Ready"}
      </Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          disabled={!currentExercise.title || index == 1}
          onPress={loadPrev}
        >
          <MaterialIcons
            style={[
              styles.buttonPrev,
              !currentExercise.title || index == 1
                ? styles.buttonNone
                : styles.buttonPrev,
            ]}
            name="skip-previous"
            size={24}
            color="#aa01fe"
          />
        </TouchableOpacity>
        <CountdownCircleTimer
          key={index}
          strokeWidth={8}
          isPlaying={isPlaying}
          duration={currentExercise.duration ? currentExercise.duration : 5}
          size={110}
          colors={"#fe4081"}
          onComplete={handleComplete}
        >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 35 }}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
        <TouchableOpacity onPress={loadNext}>
          <MaterialIcons
            style={styles.buttonNext}
            name="skip-next"
            size={24}
            color="#aa01fe"
          />
        </TouchableOpacity>
      </View>
      <WorkoutVideo
        isPlaying={isPlaying}
        onLeave={leaveWorkout}
        videoUri={currentExercise.video}
      />
      <TouchableOpacity onPress={handlePlayPause}>
        {isPlaying ? (
          <MaterialIcons name="pause-circle-filled" size={72} color="#aa01fe" />
        ) : (
          <MaterialIcons name="play-circle-fill" size={72} color="#aa01fe" />
        )}
      </TouchableOpacity>
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
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: deviceWidth,
  },
  buttonNext: {
    marginLeft: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#aa01fe",
    borderRadius: 10,
  },
  buttonPrev: {
    marginRight: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#aa01fe",
    borderRadius: 10,
  },
  buttonNone: {
    color: "transparent",
    borderColor: "transparent",
  },
});
