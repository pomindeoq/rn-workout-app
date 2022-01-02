import React, { useState, useRef } from "react";
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
import { loadExercise } from "../redux/actions";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Video, AVPlaybackStatus } from "expo-av";

const deviceWidth = Dimensions.get("window").width;

const WorkoutExerciseScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { currentExercise, exercises } = useSelector(
    (state) => state.exercises
  );

  console.log(currentExercise.video);
  const [isPlaying, setIsPlaying] = useState(true);
  let [index, setindex] = useState(0);
  const video = useRef(null);

  const loadPrev = () => {
    if (index > 0) {
      dispatch(loadExercise(index - 1));
      setindex(index - 1);
    }
  };

  const loadNext = () => {
    if (index < exercises.length - 1) {
      dispatch(loadExercise(index + 1));
      setindex(index + 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentExercise.title ? currentExercise.title : "Get Ready"}
      </Text>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={loadPrev}>
          <MaterialIcons
            style={styles.buttonPrev}
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
          onComplete={() => {
            dispatch(loadExercise(index));
            setindex(index + 1);
          }}
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
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: currentExercise.video }}
        shouldPlay={true}
        isLooping={true}
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
  video: {
    width: deviceWidth,
    height: 200,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
});
