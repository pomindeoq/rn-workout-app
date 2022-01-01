import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Exercise = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: exercise.photo }} />
      <View style={styles.info}>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text>{exercise.duration} sec</Text>
      </View>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  info: {
    marginLeft: 10,
  },
});
