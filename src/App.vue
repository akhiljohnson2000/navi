<script>
export default {
  name: "App",
};
</script>

<template>
  <p>
    <router-link to="/docs">Docs</router-link> |
    <router-link to="/workout">Workouts</router-link> | 
    <router-link to="/cool-works">SomeCoolWorks</router-link> 
    <br/>
  </p>
  <router-view></router-view>
</template>