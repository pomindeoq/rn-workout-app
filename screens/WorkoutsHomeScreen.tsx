import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../redux/actions";
import WorkoutPlan from "../components/WorkoutPlan";
import * as interfaces from "../models/interfaces";
import { InitialWorkoutsState } from "../models/interfaces";

const WorkoutsHomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { workoutsPlans, loading, error }: InitialWorkoutsState = useSelector(
    (state: InitialWorkoutsState) => state.workouts
  );

  useEffect(() => {
    dispatch(getWorkouts());
  }, []);

  const selectPlan = (plan: interfaces.WorkoutPlan): void => {
    navigation.navigate("Workout", {
      workouts: plan.questions,
    });
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>An error occurred!</Text>
        <View>
          <Text style={styles.error}>{error.toString()}</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#aa01fe" />
      </View>
    );
  }

  if (!loading && workoutsPlans.length === 0 && !error) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>No workouts found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wourkout Plans</Text>
      <FlatList
        style={styles.list}
        data={workoutsPlans}
        renderItem={(plan) => (
          <WorkoutPlan
            workoutPlan={plan.item}
            onPress={() => {
              selectPlan(plan.item);
            }}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default WorkoutsHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  item: {
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 8,
    height: 50,
    borderColor: "grey",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  list: {
    margin: 20,
    marginBottom: 0,
  },
  error: {
    marginTop: 20,
    color: "red",
    fontSize: 16,
  },
  info: {
    fontSize: 18,
  },
});
