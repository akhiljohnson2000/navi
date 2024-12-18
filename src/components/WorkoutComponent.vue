<script setup>
    const d = new Date();
    let day = d.getDay()
</script>

<template>
    <br>
    <br>
    <div :style="{'font-size': '40px'}">Today :
    <span v-if="day == 0">Sunday</span>
    <span v-if="day == 1">Monday</span>
    <span v-if="day == 2">Tuesday</span>
    <span v-if="day == 3">Wednesday</span>
    <span v-if="day == 4">Thursday</span>
    <span v-if="day == 5">Friday</span>
    <span v-if="day == 6">Saturday</span></div>


    <br>
    <br>
    Warm-up (5 minutes): Do light cardio, such as jogging in place, jumping jacks, or arm circles before each workout.
    <br>
    Cool down (5 minutes): Stretch major muscle groups to aid recovery.
    <br>
    Perform the exercises as a circuit, resting for 15-30 seconds between moves.

    <br>
    <br>

    <span v-if="day == 0">
        <span :style="{'font-size': '30px'}">
            Full-Body Fat Burn
        </span><br>
        <span :style="{'font-size': '20px'}">
            Repeat the circuit 3 times
        </span><br>
        <span>
            Jumping Jacks – 40 seconds <br>
            Push-ups (knees optional) – 12 reps <br>
            Squats – 15 reps <br>
            High Knees – 40 seconds <br>
            Plank Hold – 30 seconds <br>
        </span><br>
    </span>

    <span v-if="day == 1">
        <span :style="{'font-size': '30px'}">
            Lower Body Focus
        </span><br>
        <span :style="{'font-size': '20px'}">
            Perform each exercise for 40 seconds, rest 20 seconds, repeat 3 times
        </span><br>
        <span>
            Bodyweight Lunges (alternating legs) – 12 reps per leg <br>
            Glute Bridges – 15 reps <br>
            Jump Squats – 12 reps <br>
            Wall Sit – 30 seconds <br>
            Calf Raises – 20 reps <br>
        </span><br>

    </span>

    <span v-if="day == 2">
        <span :style="{'font-size': '30px'}">
            Cardio Blast
        </span><br>
        <span :style="{'font-size': '20px'}">
            Repeat the circuit 3 times
        </span><br>
        <span>
            Burpees <br>
            Mountain Climbers <br>
            Skaters (side-to-side lunges with a jump) <br>
            Jumping Jacks <br>
            Shadow Boxing <br>
        </span><br>

    </span>

    <span v-if="day == 3">
        <span :style="{'font-size': '30px'}">
            Upper Body & Core
        </span><br>
        <span :style="{'font-size': '20px'}">
            Repeat the circuit 3 times
        </span><br>
        <span>
            Push-ups – 10-12 reps <br>
            Tricep Dips (use a chair) – 10-12 reps <br>
            Superman Hold (lie on stomach, lift arms and legs) – 30 seconds <br>
            Russian Twists (with or without a weight) – 20 twists <br>
            Plank Shoulder Taps – 20 taps <br>
        </span><br>

    </span>

    <span v-if="day == 4">
        <span :style="{'font-size': '30px'}">
            Core & Abs
        </span><br>
        <span :style="{'font-size': '20px'}">
            Repeat the circuit 3 times
        </span><br>
        <span>
            Bicycle Crunches – 20 reps <br>
            Leg Raises – 12 reps <br>
            Plank with Hip Dips – 12 dips<br>
            Flutter Kicks – 40 seconds <br>
            Sit-ups – 15 reps <br>
        </span><br>

    </span>

    <span v-if="day == 5">
        <span :style="{'font-size': '30px'}">
            Active Recovery (Low-Impact)
        </span><br>
        <span>
            30-minute brisk walk, yoga, or stretching <br>
            Focus on improving flexibility and letting your muscles recover. <br>
        </span><br>
    </span>

    <span v-if="day == 6">
        <span :style="{'font-size': '30px'}">
            Full-Body HIIT (High-Intensity Interval Training)
        </span><br>
        <span :style="{'font-size': '20px'}">
            Perform each move for 45 seconds, rest for 15 seconds, repeat the circuit 3 times
        </span><br>
        <span>
            Jumping Lunges <br>
            Push-ups <br>
            Squat Jumps <br>
            Plank to Push-up <br>
            Burpees <br>
        </span><br>

    </span>

</template>
