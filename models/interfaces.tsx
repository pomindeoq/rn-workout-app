export interface WorkoutPlan {
  name: string;
  slug: string;
  questions: Workout[];
}

export interface Workout {
  title: string;
  exercises: Exercise[];
  muscle_group: MuscleGroup;
}

export interface Exercise {
  id: string;
  title: string;
  duration: number;
  video: string;
  photo: string;
  description: string;
  progress: "completed" | "skipped";
}

export interface MuscleGroup {
  name: string;
  photo: string;
}

export interface InitialWorkoutsState {
  workoutsPlans: WorkoutPlan[] | [];
  loading: boolean;
  error: Error | null;
}

export interface InitialExercisesState {
  currentExercise: Exercise | {};
  exercises: Exercise[] | [];
}

export interface WorkoutsApiResponse {
  data: {};
}
