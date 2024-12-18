<script setup>
import { ref, computed } from 'vue'

import HelloWorld from './components/HelloWorld.vue';
import CodingDocs from './components/CodingDocs.vue';
import NotFound from './components/NotFound.vue';
import WorkoutComponent from './components/WorkoutComponent.vue';


const routes = {
  '/': HelloWorld,
  '/workout' : WorkoutComponent,
  '/docs': CodingDocs
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <!-- <a href="#/">Home</a> | -->
  <a href="#/workout">Workout</a> |
  <a href="#/jobsearch">Job Search</a> |
  <a href="#/docs">Docs</a> |
  <!-- <a href="#/non-existent-path">Broken Link</a> -->
  <component :is="currentView" />
</template>