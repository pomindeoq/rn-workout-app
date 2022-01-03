import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as interfaces from "../models/interfaces";

interface ExerciseProps {
  exercise: interfaces.Exercise;
  showImage: boolean;
}

const Exercise = ({ exercise, showImage }: ExerciseProps) => {
  return (
    <View style={styles.container}>
      {showImage ? (
        <Image style={styles.image} source={{ uri: exercise.photo }} />
      ) : exercise.progress === "completed" ? (
        <MaterialIcons name="done" size={24} color="#1de9b6" />
      ) : (
        <MaterialIcons name="close" size={24} color="#aa01fe" />
      )}
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
