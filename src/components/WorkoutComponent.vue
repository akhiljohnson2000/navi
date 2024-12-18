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
    
</template>
