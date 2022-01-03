import { Exercise } from "../models/interfaces";

export const countExercisesDuration = (exercises: Exercise[]): string => {
  let duration = 0;
  for (const exercise of exercises) {
    duration += exercise.duration;
  }
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  return `${minutes} minutes ${seconds} seconds`;
};
