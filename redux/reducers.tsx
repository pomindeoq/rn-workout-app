import { combineReducers, AnyAction } from "redux";
import {
  GET_WORKOUTS_BEGIN,
  GET_WORKOUTS_SUCCESS,
  GET_WORKOUTS_FAILURE,
} from "./actions";

const initialWorkoutsState = {
  workoutsPlans: [],
  loading: false,
  error: null,
};

export function workoutsReducer(
  state = initialWorkoutsState,
  action: AnyAction
) {
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

export default combineReducers({
  workouts: workoutsReducer,
});
