import { Dispatch } from "redux";
import * as API from "../api/workoutsAPI";

export const GET_WORKOUTS_BEGIN = "GET_WOURKOUTS_BEGIN";
export const GET_WORKOUTS_SUCCESS = "GET_WORKOUTS_SUCCESS";
export const GET_WORKOUTS_FAILURE = "GET_WORKOUTS_FAILURE";
export const SAVE_EXERCISES = "SAVE_EXERCISES";
export const LOAD_EXERCISE = "LOAD_EXERCISE";

export function getWorkoutsSuccess(workoutsResponse) {
  return {
    type: GET_WORKOUTS_SUCCESS,
    workoutsPlans: workoutsResponse.data,
    loading: false,
  };
}

export function getWorkoutsFailure(error: Error) {
  return {
    type: GET_WORKOUTS_FAILURE,
    error,
  };
}

export function getWorkouts() {
  return (dispatch: Dispatch) => {
    dispatch({ type: GET_WORKOUTS_BEGIN });
    API.getWorkouts()
      .then((res) => dispatch(getWorkoutsSuccess(res)))
      .catch((error) => dispatch(getWorkoutsFailure(error)));
  };
}

export const saveExercises = (exercises) => {
  return {
    type: SAVE_EXERCISES,
    exercises: exercises,
  };
};

export const loadExercise = (exerciseIndex) => {
  return {
    type: LOAD_EXERCISE,
    exerciseIndex,
  };
};
