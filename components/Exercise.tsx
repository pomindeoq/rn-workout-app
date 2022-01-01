import React from "react";
import { View, Text, Image } from "react-native";

const Exercise = ({ exercise }) => {
  console.log(exercise.photo);
  return (
    <View>
      <Image source={{ uri: exercise.photo }} />
      <Text>{exercise.title}</Text>
      <Text>{exercise.duration}</Text>
    </View>
  );
};

export default Exercise;
