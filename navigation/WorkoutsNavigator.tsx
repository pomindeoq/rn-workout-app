import { createStackNavigator } from "@react-navigation/stack";
import WorkoutsHomeScreen from "../screens/WorkoutsHomeScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import WorkoutExerciseScreen from "../screens/WorkoutExerciseScreen";
import WorkoutSummaryScreen from "../screens/WorkoutSummaryScreen";
import { Workout } from "../models/interfaces";

type WorkoutsStackParamList = {
  Home: undefined;
  Workout: { workouts: Workout[] };
  Exercise: undefined;
  Summary: undefined;
};

const Workouts = createStackNavigator<WorkoutsStackParamList>();

function WorkoutsNavigator() {
  return (
    <Workouts.Navigator initialRouteName="Home">
      <Workouts.Screen name="Home" component={WorkoutsHomeScreen} />
      <Workouts.Screen name="Workout" component={WorkoutScreen} />
      <Workouts.Screen name="Exercise" component={WorkoutExerciseScreen} />
      <Workouts.Screen name="Summary" component={WorkoutSummaryScreen} />
    </Workouts.Navigator>
  );
}

export default WorkoutsNavigator;
