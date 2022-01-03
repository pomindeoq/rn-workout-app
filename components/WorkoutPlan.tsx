import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as interfaces from "../models/interfaces";

interface WorkoutPlanProps {
  workoutPlan: interfaces.WorkoutPlan;
  onPress: () => void;
}

const WorkoutPlan = ({ workoutPlan, onPress }: WorkoutPlanProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: workoutPlan.questions[0].muscle_group.photo }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>
            {workoutPlan.questions[0].muscle_group.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlan;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
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
