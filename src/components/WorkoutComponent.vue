<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <div v-if="isWorkoutComplete" class="text-center">
      <h2 class="text-2xl text-green-600">Workout Complete for Today! Great Job!</h2>
    </div>
    <div v-else class="text-center">
      <h1 class="text-3xl font-bold mb-4">{{ randomQuote }}</h1>
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
        <img :src="require(`../assets/gifs/${currentStep.gif_url}.gif`)" alt="Workout Demo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      "quotes": [
        { "quote": "Your home gym is where the magic happens." },
        { "quote": "The only bad workout is the one you didn’t do." },
        { "quote": "Don’t wish for it, work for it. Right from your home." },
        { "quote": "Get stronger at home, one rep at a time." },
        { "quote": "Home gym, home results." },
        { "quote": "The only limit in your home gym is the one you set yourself." },
        { "quote": "Success starts with a decision to get up and move." },
        { "quote": "Consistency is key, and it starts at home." },
        { "quote": "Home is where the hustle happens." },
        { "quote": "You don’t need a fancy gym to get fit." },
        { "quote": "Sweat now, shine later – right in your living room." },
        { "quote": "The best project you’ll ever work on is you." },
        { "quote": "Where there’s a will, there’s a way to work out at home." },
        { "quote": "No gym? No problem!" },
        { "quote": "Home is where the fitness begins." },
        { "quote": "The hardest part of a home workout is starting." },
        { "quote": "Push yourself, because no one else is going to do it at home." },
        { "quote": "It doesn’t matter where you are, just make it happen." },
        { "quote": "Home gym, but with results as if you were at the gym." },
        { "quote": "You don't need a gym to get a great workout." },
        { "quote": "Create your own fitness paradise at home." },
        { "quote": "The only time success comes before work is in the dictionary." },
        { "quote": "Working out at home is no excuse for not working hard." },
        { "quote": "A workout is a workout, no matter where you are." },
        { "quote": "Your gym is where you make it." },
        { "quote": "Your body is your home. Treat it with respect." },
        { "quote": "No crowds, no waiting—just pure fitness at home." },
        { "quote": "When you’re working out at home, your biggest competitor is yourself." },
        { "quote": "Home gym, home strength." },
        { "quote": "Make every rep count, no matter where you are." },
        { "quote": "Transform your home, transform yourself." },
        { "quote": "The only competition at home is who you were yesterday." },
        { "quote": "The best part about working out at home is you can do it in your pajamas." },
        { "quote": "Your home gym is your personal powerhouse." },
        { "quote": "The gym is wherever you want it to be." },
        { "quote": "Home workouts are the most convenient workouts." },
        { "quote": "A strong body begins at home." },
        { "quote": "Transform your home into the gym of your dreams." },
        { "quote": "Stay fit, no excuses, even at home." },
        { "quote": "Workout at home today, conquer the world tomorrow." },
        { "quote": "Make your home the best gym in the world." },
        { "quote": "Don’t wait for the perfect gym, create it at home." },
        { "quote": "Get fit at home—no commute needed." },
        { "quote": "Find your focus, even in your living room." },
        { "quote": "A home gym is a mindset, not a location." },
        { "quote": "Work hard in silence, let your results speak at home." },
        { "quote": "Home workouts teach you how to push yourself." },
        { "quote": "You’re the only one who can limit what you can do at home." },
        { "quote": "Sweat is just your fat crying at home." },
        { "quote": "Your home gym is where you find your strength." },
        { "quote": "The only competition is you—at home." },
        { "quote": "Stop wishing for a beach body, start working for it at home." },
        { "quote": "Strength starts at home." },
        { "quote": "Every rep in your home gym brings you closer to your goals." },
        { "quote": "The results you want are the results you can make happen at home." },
        { "quote": "Home workouts: where discipline meets comfort." },
        { "quote": "Home is where your fitness journey begins." },
        { "quote": "Create your own gym environment—at home." },
        { "quote": "No crowds, no distractions—just pure focus at home." },
        { "quote": "The hardest part is starting, but once you do, your home gym becomes your sanctuary." },
        { "quote": "Home gym: because you don’t need a fancy gym to get results." },
        { "quote": "Fitness doesn’t stop just because you’re at home." },
        { "quote": "Success doesn’t happen overnight, but it can happen at home." },
        { "quote": "Home workouts are all about consistency, not perfection." },
        { "quote": "The only workout that matters is the one you do at home." },
        { "quote": "Transform your living room into a fitness studio." },
        { "quote": "Your home gym is just as important as any other gym." },
        { "quote": "Make progress at home, even if it’s just one step at a time." },
        { "quote": "Every sweat drop at home is a step closer to your goals." },
        { "quote": "Don’t just wish for fitness—build it at home." },
        { "quote": "Home workouts bring the gym to you." },
        { "quote": "Fitness isn’t about where you work out, it’s about how you work out." },
        { "quote": "Home gym: your body’s favorite place." },
        { "quote": "You are your best personal trainer at home." },
        { "quote": "Start small, but start somewhere—at home." },
        { "quote": "Home is where your fitness journey takes place." },
        { "quote": "The best thing about a home gym? It’s always open." },
        { "quote": "Create your best body in the comfort of your home." },
        { "quote": "Home gym: where results and comfort meet." },
        { "quote": "Consistency is key—especially when working out at home." },
        { "quote": "You can do it at home. You just have to start." },
        { "quote": "No need for a fancy gym—just make your home your gym." },
        { "quote": "Home is where the hard work pays off." },
        { "quote": "Take the first step at home and see what happens." },
        { "quote": "Build strength and endurance at home." },
        { "quote": "Home workouts are your best investment." },
        { "quote": "Your house is your gym. Build it and make it happen." },
        { "quote": "Home gym workouts never disappoint." },
        { "quote": "There’s no place like home to get stronger." },
        { "quote": "Home is where you set your fitness goals and crush them." },
        { "quote": "Home gym: because results don’t have a schedule." },
        { "quote": "Do it for your future self—start at home." },
        { "quote": "Home gym, home results." },
        { "quote": "Your home gym is the best personal investment you’ll ever make." },
        { "quote": "If you can’t make it to the gym, bring the gym to you." },
        { "quote": "The comfort of your home should not be an excuse to skip the workout." },
        { "quote": "The home gym isn’t just about equipment. It’s about dedication." },
        { "quote": "Your home gym is your personal arena for greatness." },
        { "quote": "Stop waiting for the perfect gym. Create it at home." },
        { "quote": "A great home workout is just as powerful as any gym workout." }
      ],
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
            "gif_url": "mountain-climbers"
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
        ],
        "Common": [
          {
            "activity_title": "Warmup",
            "activity_desc": "Light stretches/Jogging in place",
            "time_duration": 1,
            "gif_url": ""
          },
          {
            "activity_title": "Warmup",
            "activity_desc": "Arm circles.",
            "time_duration": 1,
            "gif_url": "arm-circles"
          },
          {
            "activity_title": "Push-ups",
            "activity_desc": "Perform push-ups.",
            "time_duration": 1,
            "gif_url": "push-ups"
          },
          {
            "activity_title": "REST",
            "activity_desc": "Take some rest.",
            "time_duration": 1,
            "gif_url": ""
          },
          {
            "activity_title": "Dumbbell Deadlifts",
            "activity_desc": "Lift dumbbells from the ground with proper form.",
            "time_duration": 1,
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
          },
          {
            "activity_title": "REST",
            "activity_desc": "Take some rest.",
            "time_duration": 1,
            "gif_url": ""
          }
        ]
      },
      currentDay: "Common", 
      // new Date().toLocaleString('en-US', { weekday: 'long' })
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
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.randomQuote = this.quotes[randomIndex].quote;
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
