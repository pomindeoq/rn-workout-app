import axios from "axios";

export async function getWorkouts() {
  const url =
    "https://rnd.kilohealthservices.com/api/quizzes/workouts?api_token=4bfcebd0-0216-4572-bdb7-939e9600b9b2";
  try {
    const res = await axios.get(url);
    const workoutPlans = [];
    // implement more workout plans here
    workoutPlans.push(res.data.data);
    return {
      data: workoutPlans,
    };
  } catch (err) {
    return Promise.reject(err);
  }
}
