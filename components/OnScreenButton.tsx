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
  color: string;
  textColor: string;
  borderColor: string;
  onPress: () => void;
}

const OnScreenButton = ({
  title,
  onPress,
  textColor,
  color,
  borderColor,
}: OnScreenButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.buttonStyle,
          { backgroundColor: color, borderColor: borderColor },
        ]}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
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
    borderRadius: 8,
    height: 50,
    width: deviceWidth - 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
  },
});
