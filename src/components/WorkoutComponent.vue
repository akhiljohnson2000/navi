<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <h1 class="text-3xl font-bold mb-4">Weekly Workout Plan</h1>
    <div v-if="isWorkoutComplete" class="text-center">
      <h2 class="text-2xl text-green-600">Workout Complete for Today! Great Job!</h2>
    </div>
    <div v-else class="text-center">
      <h2 class="text-xl font-semibold mb-2">{{ currentStep.activity_title }}</h2>
      <p class="mb-4">{{ currentStep.activity_desc || 'Follow the instructions.' }}</p>
      <p class="text-gray-600 mb-4">Duration: {{ currentStep.time_duration }} minute(s)</p>
      <div class="relative w-32 h-32 mb-4">
        <!-- <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
          <path class="text-gray-300 stroke-current" fill="none" stroke-width="3" d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path class="text-blue-600 stroke-current" fill="none" stroke-width="3"
            :stroke-dasharray="(timer / (currentStep.time_duration * 60)) * 100 + ', 100'" d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg> -->
        <p class="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {{ Math.floor(timer / 60) }}:{{ (timer % 60).toString().padStart(2, '0') }}
        </p>
      </div>
      <div v-if="currentStep.gif_url">
        <img :src="require(`../assets/gifs/${currentStep.gif_url}.gif`)" alt="Workout Demo"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      "workoutPlans": {
        "Monday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Jogging in place.",
            "time_duration": 5,
            "gif_url": "../../assets/gifs/jogging-in-place.gif"
          },
          {
            "activity_title": "Dumbbell Curls",
            "activity_desc": "Perform bicep curls with dumbbells.",
            "time_duration": 2,
            "gif_url": "/assets/gifs/dumbbell-curls.gif"
          },
          {
            "activity_title": "Push-ups",
            "activity_desc": "Perform regular or knee push-ups.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/push-ups.gif"
          },
          {
            "activity_title": "Plank",
            "activity_desc": "Hold a plank position.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/plank.gif"
          }
        ],
        "Tuesday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Light stretches.",
            "time_duration": 5,
            "gif_url": "/assets/gifs/light-stretches.gif"
          },
          {
            "activity_title": "Dumbbell Shoulder Press",
            "activity_desc": "Press dumbbells overhead.",
            "time_duration": 2,
            "gif_url": "/assets/gifs/dumbbell-shoulder-press.gif"
          },
          {
            "activity_title": "Jumping Jacks",
            "activity_desc": "Perform jumping jacks.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/jumping-jacks.gif"
          },
          {
            "activity_title": "Squats",
            "activity_desc": "Perform bodyweight squats.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/squats.gif"
          }
        ],
        "Wednesday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Arm circles.",
            "time_duration": 5,
            "gif_url": "arm-circles"
          },
          {
            "activity_title": "Dumbbell Deadlifts",
            "activity_desc": "Lift dumbbells from the ground with proper form.",
            "time_duration": 2,
            "gif_url": "dumbbell-deadlifts"
          },
          {
            "activity_title": "Burpees",
            "activity_desc": "Perform burpees.",
            "time_duration": 1,
            "gif_url": "burpees"
          },
          {
            "activity_title": "Lunges",
            "activity_desc": "Perform alternating lunges.",
            "time_duration": 1,
            "gif_url": "lunges"
          }
        ],
        "Thursday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Jumping in place.",
            "time_duration": 5,
            "gif_url": "jumping-in-place"
          },
          {
            "activity_title": "Dumbbell Rows",
            "activity_desc": "Perform rows with dumbbells.",
            "time_duration": 2,
            "gif_url": "dumbbell-rows"
          },
          {
            "activity_title": "Push-ups",
            "activity_desc": "Perform push-ups.",
            "time_duration": 1,
            "gif_url": "push-ups"
          },
          {
            "activity_title": "Mountain Climbers",
            "activity_desc": "Perform mountain climbers.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/mountain-climbers.gif"
          }
        ],
        "Friday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Jogging in place.",
            "time_duration": 5,
            "gif_url": "/assets/gifs/jogging-in-place.gif"
          },
          {
            "activity_title": "Dumbbell Squats",
            "activity_desc": "Perform squats holding dumbbells.",
            "time_duration": 2,
            "gif_url": "/assets/gifs/dumbbell-squats.gif"
          },
          {
            "activity_title": "Jump Squats",
            "activity_desc": "Perform jump squats.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/jump-squats.gif"
          },
          {
            "activity_title": "Plank",
            "activity_desc": "Hold a plank position.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/plank.gif"
          }
        ],
        "Saturday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Dynamic stretches.",
            "time_duration": 5,
            "gif_url": "/assets/gifs/dynamic-stretches.gif"
          },
          {
            "activity_title": "Dumbbell Lateral Raises",
            "activity_desc": "Raise dumbbells to the side.",
            "time_duration": 2,
            "gif_url": "/assets/gifs/dumbbell-lateral-raises.gif"
          },
          {
            "activity_title": "High Knees",
            "activity_desc": "Perform high knees.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/high-knees.gif"
          },
          {
            "activity_title": "Push-ups",
            "activity_desc": "Perform push-ups.",
            "time_duration": 1,
            "gif_url": "/assets/gifs/push-ups.gif"
          }
        ],
        "Sunday": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Light stretches.",
            "time_duration": 5,
            "gif_url": "/assets/gifs/light-stretches.gif"
          },
          {
            "activity_title": "Cool Down",
            "activity_desc": "Stretch major muscles.",
            "time_duration": 5,
            "gif_url": "/assets/gifs/cool-down.gif"
          }
        ]
      },
      currentDay: new Date().toLocaleString('en-US', { weekday: 'long' }),
      currentStep: {},
      timer: 0,
      isWorkoutComplete: false,
    };
  },
  methods: {
    sleep(seconds) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    },
    async startWorkout() {
      const todayWorkout = this.workoutPlans[this.currentDay] || [];

      for (const step of todayWorkout) {
        await this.executeStep(step);
      }

      this.isWorkoutComplete = true;
    },
    async executeStep(step) {
      this.currentStep = step;
      this.timer = step.time_duration * 60;

      while (this.timer > 0) {
        await this.sleep(1);
        this.timer--;
      }
    },
  },
  mounted() {
    this.startWorkout();
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

svg {
  transform: rotate(-90deg);
}

path {
  transition: stroke-dasharray 0.5s ease;
}
</style>
