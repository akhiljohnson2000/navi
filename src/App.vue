<script>
// const routes = {
//   '/': HelloWorld,
//   '/workout' : WorkoutComponent,
//   '/docs': CodingDocs
// }
 
export default {
  name: "App",
};
</script>

<template>
  <p>
    <router-link to="/docs">Docs</router-link> |
    <router-link to="/workout">Workouts</router-link> 
    
    <br />
  </p>
  <router-view></router-view>
</template>