import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import OnScreenButton from "./OnScreenButton";
import { Video, AVPlaybackStatus } from "expo-av";

const deviceWidth = Dimensions.get("window").width;

interface WorkoutVideoProps {
  videoUri: string;
  onLeave: () => void;
  isPlaying: boolean;
}

const WorkoutVideo = ({ onLeave, videoUri, isPlaying }: WorkoutVideoProps) => {
  return (
    <View>
      <Video
        style={styles.video}
        source={{ uri: videoUri }}
        shouldPlay={isPlaying}
        isLooping={true}
      />
      {!isPlaying ? (
        <View style={styles.overlay}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: "white",
              marginTop: 40,
            }}
          >
            Workout paused
          </Text>
          <Text style={{ fontSize: 18, color: "white", marginTop: 40 }}>
            Press "Play button" to continue
          </Text>
          <OnScreenButton
            title="Leave Workout"
            onPress={onLeave}
            color="transparent"
            borderColor="white"
            textColor="white"
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default WorkoutVideo;

const styles = StyleSheet.create({
  video: {
    width: deviceWidth,
    height: 250,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: "black",
    width: deviceWidth,
  },
});
