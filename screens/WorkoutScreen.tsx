import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import Workout from "../components/Workout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { saveExercises } from "../redux/actions";

const WorkoutScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { workouts } = route.params;

  const startWorkout = () => {
    const exercises = workouts.map((workout) => workout.exercises).flat();
    dispatch(saveExercises(exercises));
    navigation.navigate("Exercise");
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={workouts}
        renderItem={(workout) => <Workout workout={workout.item} />}
        keyExtractor={(item) => item.title}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={startWorkout} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    margin: 20,
    marginBottom: 0,
  },
  text: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
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
    width: 300,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
