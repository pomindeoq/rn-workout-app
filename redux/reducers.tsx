import { combineReducers, AnyAction } from "redux";
import {
  Exercise,
  InitialExercisesState,
  InitialWorkoutsState,
} from "../models/interfaces";
import {
  GET_WORKOUTS_BEGIN,
  GET_WORKOUTS_SUCCESS,
  GET_WORKOUTS_FAILURE,
  SAVE_EXERCISES,
  LOAD_EXERCISE,
  SET_PROGRESS,
} from "./actions";

const initialWorkoutsState: InitialWorkoutsState = {
  workoutsPlans: [],
  loading: false,
  error: null,
};

export function workoutsReducer(
  state = initialWorkoutsState,
  action: AnyAction
): InitialWorkoutsState {
  switch (action.type) {
    case GET_WORKOUTS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_WORKOUTS_SUCCESS:
      return {
        ...state,
        workoutsPlans: action.workoutsPlans,
        loading: false,
        error: null,
      };
    case GET_WORKOUTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const initialExercisesState: InitialExercisesState = {
  currentExercise: {},
  exercises: [],
};

export function exercisesReducer(
  state = initialExercisesState,
  action: AnyAction
): InitialExercisesState {
  switch (action.type) {
    case SAVE_EXERCISES:
      return {
        ...state,
        exercises: action.exercises,
      };
    case LOAD_EXERCISE:
      return {
        ...state,
        currentExercise: state.exercises[action.exerciseIndex],
      };
    case SET_PROGRESS:
      return {
        ...state,
        exercises: state.exercises.map((exercise: Exercise) =>
          exercise.id === action.id
            ? { ...exercise, progress: action.progress }
            : exercise
        ),
      };
    default:
      return state;
  }
}

export default combineReducers({
  workouts: workoutsReducer,
  exercises: exercisesReducer,
});
