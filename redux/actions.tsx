import { Dispatch } from "redux";
import * as API from "../api/workoutsAPI";
import { Exercise, WorkoutsApiResponse } from "../models/interfaces";

export const GET_WORKOUTS_BEGIN = "GET_WOURKOUTS_BEGIN";
export const GET_WORKOUTS_SUCCESS = "GET_WORKOUTS_SUCCESS";
export const GET_WORKOUTS_FAILURE = "GET_WORKOUTS_FAILURE";
export const SAVE_EXERCISES = "SAVE_EXERCISES";
export const LOAD_EXERCISE = "LOAD_EXERCISE";
export const SET_PROGRESS = "SET_COMPLETED";

export function getWorkoutsSuccess(workoutsResponse: WorkoutsApiResponse) {
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

export const saveExercises = (exercises: Exercise[]) => {
  return {
    type: SAVE_EXERCISES,
    exercises: exercises.map((exercise: Exercise) => ({
      ...exercise,
      progress: "skipped",
    })),
  };
};

export const loadExercise = (exerciseIndex: number) => {
  return {
    type: LOAD_EXERCISE,
    exerciseIndex,
  };
};

export const setProgress = (id: number, progress: string) => {
  return {
    type: SET_PROGRESS,
    id,
    progress,
  };
};
