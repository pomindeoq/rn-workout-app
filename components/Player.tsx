import React, { useState } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { loadExercise } from "../redux/actions";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Exercise } from "../models/interfaces";

const deviceWidth = Dimensions.get("window").width;

interface PlayerProps {
  navigation: any;
  currentExercise: Exercise;
  exercises: Exercise[];
  isPlaying: boolean;
  children: any;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Player = ({
  navigation,
  currentExercise,
  exercises,
  isPlaying,
  setIsPlaying,
  children,
}: PlayerProps) => {
  const dispatch = useDispatch();
  let [index, setindex] = useState<number>(0);
  console.log(index);

  const loadPrev = (): void => {
    if (index > 0) {
      dispatch(
        loadExercise(
          index - 1,
          currentExercise.progress,
          parseInt(currentExercise.id)
        )
      );
      setindex(index - 1);
    }
  };

  const loadNext = (): void => {
    if (index < exercises.length - 1) {
      //dispatch(setProgress(parseInt(currentExercise.id), "skipped"));
      dispatch(
        loadExercise(index + 1, "skipped", parseInt(currentExercise.id))
      );
      setindex(index + 1);
    } else if (index === exercises.length - 1) {
      navigation.navigate("Summary");
    }
  };

  const handlePlayPause = (): void => {
    setIsPlaying((prev: boolean) => !prev);
  };

  const handleComplete = (): void => {
    if (index === exercises.length - 1) {
      navigation.navigate("Summary");
    } else {
      //dispatch(setProgress(parseInt(currentExercise.id), "completed"));
      dispatch(loadExercise(index, "completed", parseInt(currentExercise.id)));
      setindex(index + 1);
    }
  };

  return (
    <View style={styles.container}>
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
          colors={currentExercise.title ? "#fe4081" : "#1de9b6"}
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
      {children}
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

export default Player;

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
