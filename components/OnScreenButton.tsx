import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const deviceWidth = Dimensions.get("window").width;

interface OnScreenButtonProps {
  title: string;
  onPress: () => void;
}

const OnScreenButton = ({ title, onPress }: OnScreenButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnScreenButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonStyle: {
    margin: 5,
    backgroundColor: "#aa01fe",
    borderRadius: 8,
    height: 50,
    width: deviceWidth - 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
