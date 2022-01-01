import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../redux/actions";

const WorkoutsHomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  let { workoutsPlans, loading, error } = useSelector(
    (state) => state.workouts
  );

  useEffect(() => {
    dispatch(getWorkouts());
  }, [dispatch]);

  const selectPlan = (plan): void => {
    navigation.navigate("Workout", {
      workouts: plan.questions,
    });
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Wourkout Plans</Text>
      {workoutsPlans.map((plan) => (
        <TouchableOpacity
          style={[styles.item, styles.center]}
          key={plan.title}
          onPress={() => selectPlan(plan)}
        >
          <Text style={styles.text}>{plan.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default WorkoutsHomeScreen;

const styles = StyleSheet.create({
  center: {
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
  },
});
